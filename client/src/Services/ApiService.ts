import axios from 'axios';

export class ApiService {

  public get = () => {
    return axios.get('/test');
  }

  public createDraw = () => {
    return axios.post('/createDraw');
  };

  public getDraws = () => {
    return axios.get('/getDraws');
  };

  public checkDraw = (uid: string, values: number[]) => {
    return axios.post('/checkDraw', {uid,  values});
  };

  public createUser = (name: string, surname: string, age: number, email: string, password: string) => {
    return axios.post('/createUser', {name, surname, age, email, password});
  };

  public loginUser = (email: string, password: string) => {
    return axios.post('/login', { email, password });
  };

  public restoreSession = (token) => {
    return axios.post('/restoreSession', {}, {
      headers: {
        'Authorization': token
      }
    });
  };

  public logoutUser = (token) => {
    return axios.post('/logout', {},{
      headers: {
        'Authorization': token
      }
    });
  };

}