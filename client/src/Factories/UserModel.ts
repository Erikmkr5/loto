import {IUserModel} from "../Shared/types";

export const UserModelFactory = (): IUserModel => {
    const model = {
        _uid: null,
        name: null,
        surname: null,
        age: null,
        email: null,
        password: null,
    }
    // const





    return model as IUserModel
}