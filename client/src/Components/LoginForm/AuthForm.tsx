import {inject, observer} from "mobx-react";

export const AuthForm = observer(
    (props) => {
        const isDisabled = false;
        return (
            <div className={'auth-form'}>

                <input
                    className={'form-control'}
                    type={"string"}
                    disabled={isDisabled}
                    placeholder={"Enter login"}
                    onChange={ (event) => console.log(event) }
                    // value={(event) => console.log(event)}
                />

                <input
                    className={'form-control'}
                    type={"password"}
                    disabled={isDisabled}
                    placeholder={"Enter password"}
                    onChange={ (event) => console.log(event) }
                    // value={(event) => console.log(event)}
                />


                <button

                />
                {/*    проверка на заполнение всех полей и по клику отправка форм на сервер*/}


            </div>
        )
    }
)