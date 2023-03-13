// const bodyParser = require('body-parser')
// const express = require('express')
const player1 = {
    "name": "Tom",
    "surname": "Holland",
    "age": 20,
    "numbers":[ 2, 9, 17, 22, 33, 36, 48, 52, 54, 66, 67, 71, 74, 80 ]
}

function getSimilarNumbers(arr1, arr2) {
    const similarNumbers = [];

    for (let i = 0; i < arr1.length; i++) {
        const number = arr1[i];
        if (arr2.includes(number)) {
            similarNumbers.push(number);
        }
    }

    return similarNumbers;
}
class CreateLot {
    constructor(app = null){
        this.app = app || global.app
        this.app.get('/lot', ( req, res ) => {
            console.log(req)
            res.send({test:false})

        })
        this.app.post('/lot', (req, res) => {
            // app.use(express.json())
            const numb = (req.body)
            console.log(String(numb.numbers))
            console.log(String(player1.numbers))
            console.log(typeof numb.numbers)
            // res.send({test:false})

            const result = getSimilarNumbers(player1.numbers, JSON.stringify(numb.numbers))
            console.log(result.length)

            // const stringResult = result.join(', ')
            const finalResult = 'Simillar numbers are: ' + result.join(', ')
            res.send ({'text': finalResult})
                // if ( String(numb.numbers) == String(pull.numbers) ) {
                //     res.send({'text':'you won'})
                // }
                // else {
                //     res.send({'text':'you lost'})
                // }
                    // console.log('you wom')

                // }
            }
        )
        // if (numb == pull) {
        //     console.log("lol")
        // }
    }
    // if ( numb == pull ) {
    //     console.log('you won')
    //}
}

// const createLot = new CreateLot()

module.exports = CreateLot
