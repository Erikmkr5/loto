import {GLOBALS} from '../misc/cnst.js';

const {APP} = GLOBALS;

export class UsersRoute {

    constructor(app = null) {
        this.app = app || global[APP]
        this.app.post('/createUser', ( req, res ) => {
            req.body
            res.send({})
        })
    }

}
// this.app.get('/test', ( req, res ) => {
//     console.log(req)
//     res.send({test:true})
//
// })