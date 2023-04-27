

import React from 'react';
import './Header.scss'
// import {ROUTES, STORES} from "../Shared/enum";
import {STORES} from "../Shared/enum";
import { inject, observer } from 'mobx-react';
import {asClassList} from "../Shared/utils";
import { TestModelFactory } from "../Factories";
import { BiKey } from "react-icons/bi";



interface HeaderProps {
    title: string;
}

const randomUser = {
    'uid' : 1,
    'name' : 'Erik',
    'surname' : '12',
    'age' : 12,
    'email': '13ewd',
    'password' : null
}
export const Header = inject(
    'appRoutes',
    STORES.USER_STORE,
    STORES.TEST_STORE

)(observer((props) => {
    const {title, appRoutes, TestModel : model, UserStore } = props;


    console.log(appRoutes);
    // console.log(props);
    // console.log(model);


    // const registered = {}

    // function NotRegistered(){
    //     return(
    //         <button
    //             className={'btn btn-link'}
    //             onClick={() => appRoutes.goTo('authPage')}>AUTH</button>
    //
    //     )
    // }


    const classList = asClassList(['btn', UserStore.isAuthorized ? 'btn-success' : 'btn-danger']);


    return (
        <nav>
            <header className="header">
                <img onClick={() => appRoutes.goTo('home')} src="https://cdn1.iconfinder.com/data/icons/lottery-5/64/lotto_lottery_raffle_draw_scratching-512.png" className='logo'/>
                <h1 className='title'>{title}</h1>
                <div className='header-components'>


                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('home')}
                    >MAIN</button>

                    {/*{NotRegistered()}*/}
                    <button
                        className={'btn btn-link'}
                        onClick={() => appRoutes.goTo('authPage')}
                    >AUTH</button>


                    <button
                        className={'btn btn-link'}
                        onClick={() => appRoutes.goTo('regPage')}
                    >REG</button>

                    {/*{UserStore.isAuthorized ? '' : NotRegistered() }*/}

                    <button
                        className={'btn btn-link'}
                        onClick={() => appRoutes.goTo('statPage')}
                    >STATS</button>


                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('withParams', {someId: Math.floor(Math.random() * 100)})}>WITH PARAMS</button>

                    <div className='authBtn'>
                        <button
                            className={classList}

                            onClick={() => UserStore.isAuthorized ? UserStore.resetData() : UserStore.setUserData(randomUser)}

                        >
                            <span>{ UserStore.isAuthorized ? 'Log out' : 'Log in'}</span>
                        </button>
                        {/*<BiKey className='key'/>*/}
                    </div>






                </div>
            </header>
        </nav>
    );
}));

