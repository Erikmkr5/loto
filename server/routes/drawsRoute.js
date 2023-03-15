import {DEFAULT_LIMIT, DEFAULT_SELECTION_LIMIT, GLOBALS} from '../misc/cnst.js';
import {asArray, getUid} from '../misc/utils.js';
import {Script} from '../misc/script.js';

export class DrawsRoute {

  draws = new Map();

  constructor(app = null) {
    const _createDraw = (
      limit = DEFAULT_LIMIT,
      selectionLimit = DEFAULT_SELECTION_LIMIT
    ) => {
      const draw = {
        uid: getUid(),
        values: new Set(),
        date: new Date().getTime()
      };

      while (draw.values.size < selectionLimit) {
        draw.values.add(Math.floor(Math.random() * (limit + 1)));
      }

      console.log(draw.values);

      this.draws.set(draw.uid, draw);

      return draw.uid;
    };

    const _getDraws = () => {
      return Array.from(this.draws.values()).map(
        draw => ({...draw,  values: Array.from(draw.values.values()) })
      );
    };

    this.app = app || global[GLOBALS.APP];

    this.app.post('/createDraw', (req, res) => {
      res.send({uid: _createDraw()});
    });

    this.app.get('/getDraws', (req, res) => {
      res.send(_getDraws());
    });

    this.app.post('/checkDraw', (req, res) => {
      const {uid, values} = req.body;
      const draw = this.draws.get(uid);

      res.send(asArray(values).filter(val => draw?.values.has(val)));
    })
  }

}

// const {APP} = require("../misc/cnst");
// const {GLOBALS} = require('../misc/cnst.js');

// const {APP} = GLOBALS;
//
// const player1 = {
//   "name": "Tom",
//   "surname": "Holland",
//   "age": 20,
//   "numbers": [2, 9, 17, 22, 33, 36, 48, 52, 54, 66, 67, 71, 74, 80]
// }
//
// function getSimilarNumbers(arr1, arr2) {
//   const similarNumbers = [];
//
//   for (let i = 0; i < arr1.length; i++) {
//     const number = arr1[i];
//     if (arr2.includes(number)) {
//       similarNumbers.push(number);
//     }
//   }
//
//   return similarNumbers;
// }
//
// export class DrawsRoute {
//   constructor(app = null) {
//     this.app = app || global[APP];
//     this.app.get('/lot', (req, res) => {
//       console.log(req)
//       res.send({test: false})
//
//     })
//     this.app.post('/lot', (req, res) => {
//         // app.use(express.json())
//         const numb = (req.body)
//         console.log(String(numb.numbers))
//         console.log(String(player1.numbers))
//         console.log(typeof numb.numbers)
//         // res.send({test:false})
//
//         const result = getSimilarNumbers(player1.numbers, JSON.stringify(numb.numbers))
//         console.log(result.length)
//
//         // const stringResult = result.join(', ')
//         const finalResult = 'Simillar numbers are: ' + result.join(', ')
//         res.send({'text': finalResult})
//         // if ( String(numb.numbers) == String(pull.numbers) ) {
//         //     res.send({'text':'you won'})
//         // }
//         // else {
//         //     res.send({'text':'you lost'})
//         // }
//         // console.log('you wom')
//
//         // }
//       }
//     )
//     // if (numb == pull) {
//     //     console.log("lol")
//     // }
//   }
//
//   // if ( numb == pull ) {
//   //     console.log('you won')
//   //}
// }

// const createLot = new DrawsRoute()

