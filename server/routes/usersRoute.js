import {GLOBALS} from '../misc/cnst.js';
import {DB_MODEL} from '../models/cnst.js';
import {Script} from '../misc/script.js';
import {handleError} from '../misc/utils.js';

const {APP, DB} = GLOBALS;

export class UsersRoute {
  constructor(app = null, db = null) {
    this.app = app || global[APP];
    this.db = db || global[DB];

    this.app.post('/createUser', (req, res) => {
      const {email} = req.body;

      const script = new Script(
        () => this.db.read(DB_MODEL.USER, {email}),
        existingUser => {
          if (existingUser) {
            script.stop();
            return ({error: true, status: 403, statusText: 'User with same EMAIL is already registered'});
          } else {
            return this.db.create(DB_MODEL.USER, req.body);
          }
        }
      )
        .run((user, error) => {
          console.log(user);
          error || user.error
            ? handleError(user?.error ? user : error, res)
            : res.send(user);
        });
    });
  }
}