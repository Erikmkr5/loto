// import {Provider} from 'mobx-react';
// import {SelectionGrid, SelectionResults} from '../Components';
// import {TestView} from '../Components/SimpleExamples/TestView';
// import {Header} from '../Header/Header'
// import {SERVICES, STORES} from '../Shared/enum';
// import {SelectionGridModelFactory, TestModelFactory, DrawModelsFactory} from '../Factories';
// import {ApiService} from '../Services/ApiService';
// import {useEffect, useState} from "react";
//
// const Stores = {
//     [STORES.SELECTION_GRID]: SelectionGridModelFactory(),
//     [STORES.TEST_STORE]: TestModelFactory(),
//     [STORES.DRAW]: DrawModelsFactory()
// }
//
// const Services = {
//     [SERVICES.API_SERVICE]: new ApiService()
// };
//
//
// export const MainView = () => {
//     const [text, setText] = useState('zagolovok');
//     const handleInputChange = (event) => {
//         setText(event.target.value);
//     };
//
//     const inputData = {
//         firstInput :  <input type="text" id={'id1'} onChange={handleInputChange} />
//
//     }
//     return (
//         <div>
//             <div className={'lotto-main'}>
//                 <Header title={text}/>
//                 <Provider {...Stores} {...Services}>
//                     <div className={'container'}>
//                         <div className={'row'}>
//                             <div className={'col-12'}>
//                                 <h1>SELECT ITEMS</h1>
//                                 <h1>{text}</h1>
//                                 <SelectionGrid/>
//                                 <hr/>
//                                 <h3>SELECTION {inputData.firstInput}</h3>
//                                 <SelectionResults />
//                             </div>
//                             <div className={'col-12'}>
//                                 <TestView inputValue={text} onChange={handleInputChange}/>
//                             </div>
//                         </div>
//                     </div>
//                 </Provider>
//
//             </div>
//
//         </div>
//         )
//
// };


import {Provider} from 'mobx-react';
import {SelectionGrid, SelectionResults} from '../Components';
import {TestView} from '../Components/SimpleExamples/TestView';
import {SERVICES, STORES} from '../Shared/enum';
import {SelectionGridModelFactory, TestModelFactory, DrawModelsFactory} from '../Factories';
import {ApiService} from '../Services/ApiService';
import {useEffect, useState} from "react";
import {TimerExample} from "../Components/Timer/TimerExample";

// const Stores = {
//     [STORES.SELECTION_GRID]: SelectionGridModelFactory(),
//     [STORES.TEST_STORE]: TestModelFactory(),
//     [STORES.DRAW]: DrawModelsFactory()
// }

// const Services = {
//     [SERVICES.API_SERVICE]: new ApiService()
// };


export const MainView = () => {

    const text = 'MAIN PAGE'


    return (
        <div>
            <div className={'lotto-main'}>
                {/*<Provider {...Stores} {...Services}>*/}
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <h1>SELECT ITEMS</h1>
                                {/*<h1>{text}</h1>*/}
                                <TimerExample />
                                <SelectionGrid/>
                                <hr/>
                                <h3>SELECTION</h3>
                                <SelectionResults />
                            </div>
                            <div className={'col-12'}>
                                <TestView inputValue={text}/>
                            </div>
                        </div>
                    </div>
                {/*</Provider>*/}
            </div>
        </div>
    )

};