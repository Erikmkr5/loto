import React from 'react';
import './Header.scss'
import {SERVICES, STORES} from "../Shared/enum";
import { inject, observer } from 'mobx-react';
import {asClassList} from "../Shared/utils";
import { TestModelFactory } from "../Factories";
import {ApiService} from "../Services/ApiService";




interface HeaderProps {
    title: string;
}


export const Header = inject(
    'appRoutes',
    STORES.USER_STORE,
    STORES.TEST_STORE,
    SERVICES.API_SERVICE

)(observer((props) => {
    const {title, appRoutes, TestModel : model, UserStore : user } = props;
    const apiService: ApiService = props[SERVICES.API_SERVICE];


    const logoutUser = () => {
        const token = localStorage.getItem("token");
        apiService.logoutUser(token)
            .then(
                (res) => {
                    console.log(res)
                })
            .catch(err => console.log(err));
    };
    const logOut = () => {
        user.resetData()
        logoutUser()
        localStorage.removeItem('token');
    }

    const notLoggedIn = () => {
        return (
            <div>
                <button
                    className={'btn btn-link'}
                    onClick={() => appRoutes.goTo('authPage')}
                >AUTH</button>


                {/*<button*/}
                {/*    className={'btn btn-link'}*/}
                {/*    onClick={() => appRoutes.goTo('regPage')}*/}
                {/*>REG</button>*/}
            </div>
        )}


    const classList = asClassList(['btn', user.isAuthorized ? 'btn-success' : 'btn-danger']);


    return (
        <nav>
            <header className="header">
                <img onClick={() => appRoutes.goTo('home')} src="https://cdn1.iconfinder.com/data/icons/lottery-5/64/lotto_lottery_raffle_draw_scratching-512.png" className='logo' alt={'LOGO'}/>
                <h1 className='title'>{title}</h1>
                <div className='header-components'>


                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('home')}
                    >MAIN</button>

                    {/*{NotRegistered()}*/}
                    {/*{user.isAuthorized*/}
                    {/*    ? ''*/}
                    {/*    : notLoggedIn()*/}
                    {/*}*/}


                    {/*{UserStore.isAuthorized ? '' : NotRegistered() }*/}

                    <button
                        className={'btn btn-link'}
                        onClick={() => appRoutes.goTo('statPage')}
                    >STATS</button>


                    <div className='authBtn'>
                        <button
                            className={classList}

                            onClick={() => user.isAuthorized ? logOut() : appRoutes.goTo('authPage')}

                        >
                            <span>{ user.isAuthorized ? 'Logout' : 'Login'}</span>
                        </button>
                        {/*<BiKey className='key'/>*/}
                    </div>






                </div>
            </header>
        </nav>
    );
}));