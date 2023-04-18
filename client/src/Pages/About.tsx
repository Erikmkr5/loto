import React from "react";
import {Header} from "../Header/Header";


export const About = () => {
    const text = 'ABOUT PAGE'
    return(
        <div>
            <Header title={text}/>

            <h1>This page is about Lotto</h1>
        </div>

    )
}