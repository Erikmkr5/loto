import {inject, observer} from "mobx-react";
import './LoginForm.scss';
import {useState} from "react";


export const RegForm = inject(
    'appRoutes'
)(observer(
    (props) => {

        const {appRoutes} = props

        const isDisabled = false;

        const [ login, setLogin] = useState('');
        const handleLoginChange = (event) => {
                setLogin(event.target.value);
        };

        const [ password, setPassword] = useState('');
        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };
        const [ name, setName] = useState('');
        const handleNameChange = (event) => {
            setName(event.target.value);
        };
        const [ surname, setSurname] = useState('');
        const handleSurnameChange = (event) => {
            setSurname(event.target.value);
        };

        function handleForSumbit(event){
            event.preventDefault()
            if ( login === '' || password === '' || phoneNumber === '' || name === '' || surname === ''){
                alert('enter all data')
            }
        }


        const [phoneNumber, setPhoneNumber] = useState('');

        function handlePhoneChange(event) {
            let phone = event.target.value.replace(/\D/g, ''); // удаляем все нецифровые символы из ввода
            if (phone.length === 0) { // дополнительная проверка на длину
                setPhoneNumber('');
            } else if (phone.length <= 1) { // форматируем телефон X
                setPhoneNumber(`${phone}`);
            } else if (phone.length <= 4) { // форматируем телефон X-XXX
                setPhoneNumber(`${phone.substring(0, 1)} (${phone.substring(1, 4)}`);
            } else if (phone.length <= 7) { // форматируем телефон X (XXX) XXX
                setPhoneNumber(`${phone.substring(0, 1)} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}`);
            } else {
                setPhoneNumber(`${phone.substring(0, 1)} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7, 11)}`);
            }
        }




        return (

            <div className={'reg-form'}>

                <input
                    className={'form-control'}
                    type={"email"}
                    name={'login'}
                    disabled={isDisabled}
                    placeholder={"Enter login"}
                    onChange={ handleLoginChange }
                    value={ login }
                />

                <input
                    className={'form-control'}
                    type={"password"}
                    name={'password'}
                    disabled={isDisabled}
                    placeholder={"Enter password"}
                    onChange={ handlePasswordChange }
                    value={ password }
                />

                <input
                    className={'form-control'}
                    type={"string"}
                    name={'name'}
                    disabled={isDisabled}
                    placeholder={"Enter your name"}
                    onChange={ handleNameChange }
                    value={ name }
                />

                <input
                    className={'form-control'}
                    type={"string"}
                    name={'surname'}
                    disabled={isDisabled}
                    placeholder={"Enter your surname"}
                    onChange={ handleSurnameChange }
                    value={ surname }
                />

                <input
                    className={'form-control'}
                    type={"text"}
                    name={'phoneNumber'}
                    disabled={isDisabled}
                    placeholder={"Enter phone number without +"}
                    onChange={ handlePhoneChange }
                    value={ phoneNumber }
                />



                <button
                    className='authSumbitBtn'
                    onClick={handleForSumbit}
                >log in</button>
                {/*    проверка на заполнение всех полей и по клику отправка форм на сервер*/}

                <button
                    className='btn btn-link dont-have-account'
                    onClick={() => appRoutes.goTo('authPage')}
                >I already have an account.

                </button>




            </div>
        )
    }
))
