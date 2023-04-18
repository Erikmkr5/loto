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
import '../logo.png'


interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({title}) => {
    return (
        <nav>
            <header onClick={() => window.location.href = '/'} className="header">
                <img src="logo.png"/>
                <h1>{title}</h1>
                <div className={'header-components'}>
                    <a href={''}>Main</a>
                    <a href={ROUTES.ABOUT_PAGE}>About</a>
                    <a href={ROUTES.AUTH_PAGE}>Authentication</a>

                    {/*<a href={''}>Main</>*/}
                    {/*<a href={ROUTES.ABOUT_PAGE}>About</a>*/}
                    {/*<a href={ROUTES.AUTH_PAGE}>Authentication</a>*/}


                </div>
            </header>
        </nav>
    );
};

