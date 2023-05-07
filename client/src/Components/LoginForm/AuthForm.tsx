import {inject, observer} from "mobx-react";
import {useState} from "react";
import './LoginForm.scss';
import {SERVICES, STORES} from "../../Shared/enum";
import {ApiService} from "../../Services/ApiService";
import {AppUser} from "../../Factories/UserModel";


export const AuthForm = inject(
    'appRoutes',
    SERVICES.API_SERVICE,
    STORES.USER_STORE
)(observer(
    (props) => {
        const {appRoutes} = props;
        const isDisabled = false;
        const apiService: ApiService = props[SERVICES.API_SERVICE];
        const user: AppUser = props[STORES.USER_STORE];



        const enterUserData = () => {
            user.setUserData({
                email: login,
                password : password
            })
        }



        const loginUser = () => {
            // console.log(user.password)
            // console.log(user)
            // enterUserData()
            // console.log(user.password)
            // console.log(user)
            // console.log( login, password)
            apiService.loginUser(login, password)
                .then(
                    (res) => {
                        console.log(res)
                        const { token, email, name, surname, age, _id } = res.data;
                        localStorage.setItem('token', token);
                        user.setUserData({
                            email: email,
                            name: name,
                            surname: surname,
                            age: age,
                            uid: _id
                        })
                        console.log(token);
                        console.log(user)

                    }
                )
                .catch(err => console.log(err));
        };


        function handleForSubmit(event){
            event.preventDefault()
            if ( login === '' || password === ''){
                alert('enter all data')
            } else {
                loginUser()
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
                        onChange={ handleInputPasswordChange }
                        value={ password }
                    />


                    <button
                        className='authSumbitBtn'
                        onClick={ handleForSubmit }
                    >log in</button>
                    {/*    проверка на заполнение всех полей и по клику отправка форм на сервер*/}

                    <button
                        className='btn btn-link'
                        onClick={() => appRoutes.goTo('regPage')}
                    >I don't have an account.

                    </button>


                </div>
            )
        }
    )
)
