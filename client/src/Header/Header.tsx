// import React from 'react';
// import './Header.scss'
//
//
// interface HeaderProps {
//     title: string;
// }
//
// export const Header: React.FC<HeaderProps> = ({title}) => {
//     return (
//         <nav>
//             <header onClick={() => window.location.href = '/'} className="header">
//                 <h1>{title}</h1>
//                 <div className={'header-components'}>
//                     <a href={'/'}>main</a>
//                     <a href={'/about'}>About</a>
//                     <a href="/contact">Contact</a>
//                 </div>
//             </header>
//         </nav>
//     );
// };

import React from 'react';
import './Header.scss'
import {ROUTES, STORES} from "../Shared/enum";
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {asClassList} from "../Shared/utils";
import { TestModelFactory } from "../Factories";


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
    console.log(props);
    console.log(model);


    // const registered = {}

    function NotRegistered(){
        return(
            <button
                className={'btn btn-link'}
                onClick={() => appRoutes.goTo('authPage')}>AUTH PAGE</button>

        )
    }


    const classList = asClassList(['btn', model.value ? 'btn-success' : 'btn-danger']);

    return (
        <nav>
            <header className="header">
                {/*<img src="logo.png"/>*/}
                <h3 onClick={() => appRoutes.goTo('home')}>LOGO</h3>
                <h1>{title}</h1>
                <div className={'header-components'} id="my-object">

                    {/*{myObj.innerHTML}*/}

                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('home')}>HOME</button>

                    {model.value ? NotRegistered() : ''}
                    {/*<button*/}
                    {/*  className={'btn btn-link'}*/}
                    {/*  onClick={() => appRoutes.goTo('authPage')}>AUTH PAGE</button>*/}

                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('withParams', {someId: Math.floor(Math.random() * 100)})}>WITH PARAMS</button>

                    <button
                        className={classList}
                        // onClick={() => model.toggle()}
                        onClick={() => UserStore.isAuthorized ? UserStore.resetData() : UserStore.setUserData(randomUser)}

                    >
                        <span>{ UserStore.isAuthorized ? UserStore.name : 'Log in'}</span>


                    </button>




                </div>
            </header>
        </nav>
    );
}));

