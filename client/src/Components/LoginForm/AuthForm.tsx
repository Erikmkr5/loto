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
                if ( login === '' || password === ''){
                    alert('enter all data')


                }
            }

            const [ login, setLogin] = useState('');
            const handleInputChange = (event) => {
                setLogin(event.target.value);
            };

            const [ password, setPassword] = useState('');
            const handleInputPasswordChange = (event) => {
                setPassword(event.target.value);
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
                            value={login}
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
