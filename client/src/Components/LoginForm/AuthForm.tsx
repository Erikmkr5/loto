import {inject, observer} from "mobx-react";
import {useState} from "react";


export const AuthForm = observer(

    (props) => {

            const isDisabled = false;

            // function handleForSumbit(event){
            //     event.preventDefault()
            //     if ( formState.login === '' || formState.password === ''){
            //         alert('enter all data')
            //
            //     }
            // }

            const [ loginState, setLoginState] = useState('');
            const handleInputChange = (event) => {
                setLoginState(event.target.value);
            };


            // const [formState, setFormState] = useState({
            //         login: '',
            //         password: '',
            // });

                return (
                    <div className={'auth-form'}>

                        <input
                            className={'form-control'}
                            name={'login'}
                            type={"string"}
                            disabled={isDisabled}
                            placeholder={"Enter login"}
                            // onChange={ this.value => setLoginState }
                            // value={formState.login}
                        />

                        <input
                            className={'form-control'}
                            name={'password'}
                            type={"password"}
                            disabled={isDisabled}
                            placeholder={"Enter password"}
                            // onChange={ (event) => console.log(event) }
                            // value={formState.password}
                            // value={(event) => console.log(event)}
                        />


                        <button
                            // onClick={handleForSumbit}

                        />
                        {/*    проверка на заполнение всех полей и по клику отправка форм на сервер*/}


                    </div>
                )
            }
        )
