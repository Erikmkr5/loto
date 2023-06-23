import React from "react";
import {StatExample} from "../Components/Stats/StatExample";
import {STORES} from "../Shared/enum";
import {inject, observer} from "mobx-react";
import {AppUser} from "../Factories/UserModel";


export const StatPage = inject(
    STORES.USER_STORE
)(observer(props => {

    const user: AppUser = props[STORES.USER_STORE];
    if (!user.isAuthorized) {
        return <h1 >To be able to play you have to log in first</h1>
    } else {
        return(
            <div>
                <StatExample />
            </div>
        )
    }




}))