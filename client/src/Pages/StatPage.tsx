import React from "react";
import {StatExample} from "../Components/Stats/StatExample";
import {SERVICES, STORES} from "../Shared/enum";
import {DrawModelsFactory, SelectionGridModelFactory, TestModelFactory} from "../Factories";
import {ApiService} from "../Services/ApiService";
import {Provider} from "mobx-react";


const Stores = {
    [STORES.SELECTION_GRID]: SelectionGridModelFactory(),
    [STORES.TEST_STORE]: TestModelFactory(),
    [STORES.DRAW]: DrawModelsFactory()
}

const Services = {
    [SERVICES.API_SERVICE]: new ApiService()
};


export const StatPage = () => {






    return(
        <div>
            <Provider {...Stores} {...Services}>
                <StatExample />
            </Provider>



        </div>
    )
}