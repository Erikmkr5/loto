import {IUserModel} from "../Shared/types";
import {action, computed, makeAutoObservable, observable} from "mobx";

export const UserModelFactory = (): IUserModel => {
    const model = observable({
        _uid: null,
        name: null,
        surname: null,
        age: null,
        email: null,
        password: null,

    })

    // const


    return model as IUserModel
}

const USER_PROPS = ['uid', 'name', 'surname', 'age', 'email', 'password']

export class AppUser {
    public uid: string = null;
    public name: string = null;
    public surname: string = null;
    public age: number = null;
    public email: string = null;
    // private password: string = null;
    public password: string = null;

    @computed
    public get isAuthorized() : boolean {
        return !!this.uid
    }

    @action
    public setUserData( data : any ){
        Object.keys( data ).forEach( key => this[key] = data[key] )
        console.log(this.isAuthorized)
    }



    @action
    public resetData(){
         USER_PROPS.forEach( key => this[key] = null )
    }


    constructor() {
        makeAutoObservable(this)
    }

}
