import React, {useState} from "react";
import Plot from 'react-plotly.js';
import {inject, observer} from "mobx-react";
import {SERVICES, STORES} from "../../Shared/enum";
import {ApiService} from "../../Services/ApiService";
import {IDrawModel} from "../../Shared/types";
import './StatExample.scss'




export const StatExample = inject(
    STORES.DRAW,
    SERVICES.API_SERVICE,
    STORES.SELECTION_GRID
)(observer((props) => {

    const model = props[STORES.SELECTION_GRID];
    const selection = model.selection;
    const apiService: ApiService = props[SERVICES.API_SERVICE];
    const draw: IDrawModel = props[STORES.DRAW];

    const [lastDraw, setLastDraw] = useState([])
    let [allDraws, setAllDraws] = useState([])

    const createDraw = () => {
        apiService.createDraw()
            .then(({data}) => {
                draw.uid = data.uid;
            })
            .catch(err => console.log(err));
    };


    const getDraws = () => {
        apiService.getDraws()
            .then(
                (res) => {
                    // console.log(res)
                    const drawsLength = res.data.length - 1
                    console.log(res.data)
                    allDraws = res.data //!!!!
                    setAllDraws(res.data)
                    console.log(allDraws)
                    // console.log(drawsLength)
                    for (let i = drawsLength - 3; i < drawsLength + 1; i++) {
                        allDraws[i].values.forEach(insertInDio)
                        console.log(allDraws[i].values)
                    }
                }
            )
            .catch(err => console.log(err));
    };


    const insertInDio = (number) => {

        number-=1;
        const tens = Math.floor(number / 10)
        const ones = number % 10
        data[0].z[tens][ones] += 1
        console.log(data[0].z[tens][ones])
        setData([...data]);

    }

    const Generate100Draws = () => {
        for (let i = 0; i<4; i++) {
            createDraw()
            // getDraws()
            // lastDraw.forEach(insertInDio)

        }
        // console.log(data[0].z)
    }

    const xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const yValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const zValues = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
    ]
    const colorscaleValue = [
        [0, '#d0c3cb'],
        [10, '#e313b2']
    ];

    const [data, setData] = useState([
        {
            x: xValues,
            y: yValues,
            z: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            type: 'heatmap',
            colorscale: colorscaleValue,
            showscale: true,
            showgrid: true,

        },
    ]);

    const layout = {
        title: 'My Heatmap',
        annotations: [],
        xaxis: {
            title: {
                text: 'ones'
            },
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        yaxis: {
            range: [9, -1],
            title: {
                text: 'tens'
            },
            tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            // tickvals: [0, 10, 20, 30, 40, 50, 60, 70, 80],
            // ticktext: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            // scaleanchor: 'x'
        }
    };

    for ( let i = 0; i < yValues.length; i++ ) {
        for ( let j = 0; j < xValues.length; j++ ) {
            const currentValue = zValues[i][j];
            // if (currentValue != 0.0) {
            //     const textColor = 'white';
            // }else{
            //     const textColor = 'black';
            // }
            const result = {
                xref: 'x1',
                yref: 'y1',
                x: xValues[j],
                y: yValues[i],
                text: zValues[i][j],
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(14,66,197)'
                },
                showarrow: false,
                // font: {
                //     color: textColor
                // }
            };
            layout.annotations.push(result);
        }
    }



    const MyHeatmap = () => {
        return <Plot data={data} layout={layout} />;
    };


    return(
        <div>
            <MyHeatmap />
            <button className='btn btn-success' onClick={Generate100Draws}>

            </button>
            <button className='btn btn-success' onClick={getDraws}>

            </button>

        </div>
    )
}))