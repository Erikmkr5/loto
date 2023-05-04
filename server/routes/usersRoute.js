import {ENV_VARIABLES, GLOBALS, SERVER_ERRORS} from '../misc/cnst.js';
import {DB_MODEL} from '../models/cnst.js';
import {Script} from '../misc/script.js';
import {handleError, createToken, cloneObject, encryptPassword, checkPassword, isFalse, isNull} from '../misc/utils.js';

const {APP, DB} = GLOBALS;

export class UsersRoute {

  clearToken = (filter) => {
    return new Script(
      () => this.db.delete(DB_MODEL.SESSION, filter)
    ).run();
  };

  registerToken = (email) => {
    const {clearToken} = this;
    let sessionData;

    return new Script(
      () => clearToken({email}),
      () => createToken(email),
      session => {
        sessionData = session;
        this.db.create(DB_MODEL.SESSION, session)
      },
      () => sessionData.token
    ).run();
  };

  createUser = (req, res) => {
    const {registerToken} = this;
    const {email, password} = req.body;
    let userData;

    const script = new Script(
      () => {
        return [email, password].some(isFalse)
          ? script.stop(SERVER_ERRORS.BAD_REQUEST)
          : this.db.read(DB_MODEL.USER, {email});
      },
      existingUser => {
        console.log(existingUser);

        return existingUser
          ? script.stop(SERVER_ERRORS.ALREADY_EXISTS)
          : new Script(
            () => encryptPassword(password),
            hashedPassword => this.db.create(DB_MODEL.USER, {...req.body, password: hashedPassword})
          ).run();
      },
      user => {
        userData = user;
        return registerToken(userData.email);
      },
      token => {
        const user = {...cloneObject(userData), token};
        delete user.password;

        return user;
      });

    script.run((user, error) => {
      error ? handleError(error, res) : res.send(user);
    });
  };

  login = (req, res) => {
    const {registerToken} = this;
    const {email, password} = req.body;
    let userData;

    const script = new Script(
      () => this.db.read(DB_MODEL.USER, {email}),
      existingUser => {
        userData = existingUser;
        return !existingUser
          ? script.stop(SERVER_ERRORS.NOT_AUTHORIZED)
          : new Script(
            () => checkPassword(password, existingUser.password),
            isValid => isValid
              ? userData
              : script.stop(SERVER_ERRORS.NOT_AUTHORIZED)
          );
      },
      () => registerToken(email),
      token => {
        const user = {...cloneObject(userData), token};
        delete user.password;

        return user;
      });

    script.run((user, error) => {
      error ? handleError(error, res) : res.send(user);
    });
  };

  logout = (req, res) => {
    const token = req.header(ENV_VARIABLES.AUTH_TOKEN);

    const script = new Script(
      () => this.db.delete(DB_MODEL.SESSION, {token})
    );

    script.run((_, error) => {
      error ? handleError(error, res) : res.send({ok: 200});
    });
  };

  checkAuthorization = (req, res, next) => {
    const token = req.header(ENV_VARIABLES.AUTH_TOKEN);
    const script = new Script(
      () => {
        return isNull(token)
          ? script.stop(SERVER_ERRORS.NOT_AUTHORIZED)
          : this.db.read(DB_MODEL.SESSION, {token});
      },
      tokenRegistered => {
        return tokenRegistered
          ? null
          : script.stop(SERVER_ERRORS.NOT_AUTHORIZED);
      }
    );

    script.run((_, error) => {
      error ? handleError(error, res) : next();
    });
  };

  restoreSession = (req, res) => {
    const token = req.header(ENV_VARIABLES.AUTH_TOKEN);
    const script = new Script(
      () => {
        return this.db.read(DB_MODEL.SESSION, {token});
      },
      session => {
        console.log(session);

        return !session
          ? script.stop(SERVER_ERRORS.NOT_AUTHORIZED)
          : this.db.read(DB_MODEL.USER, {email: session.email})
      },
      user => {
        console.log(user);

        return !user
          ? script.stop(SERVER_ERRORS.NON_EXISTS)
          : user;
      }
    );


    script.run((user, error) => {
      error ? handleError(error, res) : res.send(user);
    });

  };

  constructor(app = null, db = null) {
    this.app = app || global[APP];
    this.db = db || global[DB];

    const { createUser, checkAuthorization, login, logout, restoreSession } = this;

    this.app.post('/createUser', createUser);

    this.app.post('/login', login);

    this.app.post('/logout', checkAuthorization, logout);

    this.app.post('/restoreSession', checkAuthorization, restoreSession);
  }

}