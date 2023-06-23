import {inject, observer} from "mobx-react";
import {useEffect, useState} from "react";
import {SERVICES, STORES} from "../../Shared/enum";
import './TimerExample.scss'
import {ApiService} from "../../Services/ApiService";
import {IDrawModel} from "../../Shared/types";



export const TimerExample = inject(
    SERVICES.API_SERVICE,
    STORES.DRAW,
    STORES.SELECTION_GRID
)(observer((props) => {

    const model = props[STORES.SELECTION_GRID];
    const selection = model.selection;
    const apiService: ApiService = props[SERVICES.API_SERVICE];
    const draw: IDrawModel = props[STORES.DRAW];


    const createDraw = () => {
        apiService.createDraw()
            .then(({data}) => {
                draw.uid = data.uid;
            })
            .catch(err => console.log(err));
    };

    const checkDraw = () => {
        apiService.checkDraw(draw.uid, selection)
            .then(({data}) => {
                draw.coincidences = data;
            })
            .catch(err => console.log(err));
    };

    const [lastDraw, setLastDraw] = useState([]) //2*60

    const getDraws = () => {
        apiService.getDraws()
            .then(
                (res) => {
                    const drawsLength = res.data.length - 1
                    setLastDraw(res.data[drawsLength].values)
                }
            )
            .catch(err => console.log(err));
    };


    const getPadTime = (time) => time.toString().padStart(2, '0')

    const [timeLeft, setTimeLeft] = useState(2) //2*60
    const [isCounting, setIsCounting] = useState(false)

    const minutes = getPadTime(Math.floor(timeLeft/60))
    const seconds = getPadTime(timeLeft - minutes * 60);


    useEffect(() => {
        const applyChanges = async () => {
            await createDraw()
            await getDraws()
            await checkDraw()
            setTimeLeft(2)
        } 
        
        const interval = setInterval(() => {
            isCounting&&
                setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft -1 : 0))
        }, 1000)
        if (timeLeft === 0) {
            setIsCounting(false);
            applyChanges()
            // createDraw()
            // getDraws()
            // checkDraw()
            // setTimeLeft(2)

        }
        return() => {
            clearInterval(interval)
        }
    }, [isCounting, timeLeft])

    const handleStart = () => {
        if (timeLeft === 0) setTimeLeft(2); //2*x

        setIsCounting(true)
    }
    const handleStop = () => {
        setIsCounting(false)
    }
    const handleReset = () => {
        setTimeLeft(2 * 60 )
        setIsCounting(false)
    }


    return(
        <div className='all-timer'>
            <div className='timer'>
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>
            <div className='buttons'>
                { isCounting
                    ? <button onClick={handleStop}>Stop</button>
                    : <button onClick={handleStart}>Start</button>}
                <button onClick={handleReset}>Reset</button>
            </div>
            { !!lastDraw.length
                ? <p> Last draw is: {lastDraw.join(', ')}</p>
                : <p> You haven't played yet</p>


            }


        </div>
    )
}))

