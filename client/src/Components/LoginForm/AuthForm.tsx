import {inject, observer} from "mobx-react";
import {useState} from "react";
import './LoginForm.scss';
import {STORES} from "../../Shared/enum";


export const AuthForm = inject(
    'appRoutes'
)(observer(

    (props) => {

            const {appRoutes} = props;
            const isDisabled = false;

            function handleForSumbit(event){
                event.preventDefault()
                if ( loginState === '' || passwordState === ''){
                    alert('enter all data')


                }
            }

            const [ loginState, setLoginState] = useState('');
            const handleInputChange = (event) => {
                setLoginState(event.target.value);
            };

            const [ passwordState, setPasswordState] = useState('');
            const handleInputPasswordChange = (event) => {
                setPasswordState(event.target.value);
            };




                return (

                    <div className={'auth-form'}>

                        <input
                            className={'form-control'}
                            type={"email"}
                            name={'login'}
                            disabled={isDisabled}
                            placeholder={"Enter login"}
                            onChange={ handleInputChange }
                            // value={formState.login}
                        />

                        <input
                            className={'form-control'}
                            type={"password"}
                            name={'password'}
                            disabled={isDisabled}
                            placeholder={"Enter password"}
                            onChange={ handleInputPasswordChange }                            // value={formState.password}
                            // value={(event) => console.log(event)}
                        />


                        <button
                            className='authSumbitBtn'
                            onClick={handleForSumbit}                        >log in</button>
                        {/*    проверка на заполнение всех полей и по клику отправка форм на сервер*/}

                        <button
                            className='btn btn-link dont-have-account'
                            onClick={() => appRoutes.goTo('regPage')}
                        >I don't have an account.

                        </button>


                    </div>
                )
            }
        )
)
