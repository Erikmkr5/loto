// import {inject, observer} from 'mobx-react';
// import {STORES} from '../../Shared/enum';
// import {asClassList} from '../../Shared/utils';
//
// export const TestView = inject(STORES.TEST_STORE)(observer(
//     (props) => {
//         const model = props.TestModel;
//         const classList = asClassList(['btn', model.value ? 'btn-success' : 'btn-danger']);
//
//         return <button
//             className={classList}
//             onClick={() => model.toggle()}
//
//         >
//             <span>{model.value ? 'OFF' : 'ON'}</span>
//
//         </button>
//     }
// ));

import {inject, observer} from 'mobx-react';
import {STORES} from '../../Shared/enum';
import {asClassList} from '../../Shared/utils';
import {useCallback, useState} from "react";

export const TestView = inject(STORES.TEST_STORE)(observer(
    (props) => {
        const model = props.TestModel;
        const classList = asClassList(['btn', model.value ? 'btn-success' : 'btn-danger']);
        const isDisabled = !model.value;
        // const [text, setText] = useState('');



        const inp = props.firstInput

        return (
            <div>
                {inp}
                <h1>{inp}</h1>
                <button
                    className={classList}
                    onClick={() => model.toggle()}

                >
                    <span>{model.value ? 'OFF' : 'ON'}</span>
                </button>

                <input type="text" disabled={isDisabled} placeholder="Enter text" onChange={props.onChange} value={props.text}/>

            </div>
            )
            }
    // const [inputDisabled, setInputDisabled] = useState(false)
    // const [value, setValue] = useState('')
    //
    // const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value), [])
    //
    // function handleClickButton() {
    //     setInputDisabled(!inputDisabled)
    // }
));
