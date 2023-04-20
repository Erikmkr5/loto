// import {inject, observer} from 'mobx-react';
// import {STORES} from '../../Shared/enum';
// import {asClassList} from '../../Shared/utils';
//
//
// export const TestView = inject(STORES.TEST_STORE)(observer(
//     (props) => {
//         const model = props.TestModel;
//         const classList = asClassList(['btn', model.value ? 'btn-success' : 'btn-danger']);
//         const isDisabled = !model.value;
//
//
//
//         const inp = props.firstInput
//
//         return (
//             <div>
//                 {inp}
//                 <h1>{inp}</h1>
//                 <button
//                     className={classList}
//                     onClick={() => model.toggle()}
//
//                 >
//                     <span>{model.value ? 'OFF' : 'ON'}</span>
//                 </button>
//
//                 <input type="text" disabled={isDisabled} placeholder="Enter text" onChange={props.onChange} value={props.text}/>
//
//             </div>
//             )
//             }
// ));
//

import {inject, observer} from 'mobx-react';
import {STORES} from '../../Shared/enum';
import {asClassList} from '../../Shared/utils';


export const TestView = inject(STORES.TEST_STORE)(observer(
    (props) => {
        const model = props.TestModel;
        const classList = asClassList(['btn', model.value ? 'btn-success' : 'btn-danger']);
        const isDisabled = !model.value;

        return (
            <div>


                <button
                    className={classList}
                    onClick={() => model.toggle()}

                >
                    <span>{model.value ? 'OFF' : 'ON'}</span>
                </button>

                <input type="text" disabled={isDisabled} placeholder="Enter text" />

            </div>
        )
    }
));
