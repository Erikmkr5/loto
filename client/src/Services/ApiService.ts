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

}