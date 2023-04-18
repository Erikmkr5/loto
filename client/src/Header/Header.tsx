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
import {ROUTES} from "../Shared/enum";
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


interface HeaderProps {
    title: string;
}

export const Header = inject('appRoutes')(observer((props) => {
    const {title, appRoutes} = props;

    console.log(appRoutes);

    return (
        <nav>
            <header className="header">
                {/*<img src="logo.png"/>*/}
                <h3>LOGO</h3>
                <h1>{title}</h1>
                <div className={'header-components'}>

                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('home')}>HOME</button>

                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('anotherRoute')}>ANOTHER ROUTE</button>

                    <button
                      className={'btn btn-link'}
                      onClick={() => appRoutes.goTo('withParams', {someId: Math.floor(Math.random() * 100)})}>WITH PARAMS</button>

                    {/*<Link to={'/'}>Main</Link>*/}
                    {/*<Link to={'/anotherRoute'}>About</Link>*/}


                </div>
            </header>
        </nav>
    );
}));

