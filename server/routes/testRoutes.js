import {GLOBALS} from '../misc/cnst.js';

const {APP} = GLOBALS;

export class TestRoute {
    constructor(app = null){
        this.app = app || global[APP];
        
        this.app.get('/test', ( req, res ) => {
            console.log(req)
            res.send({test:true})

        })
        this.app.post('/test', (req, res) => {
            console.log(req.body)
            res.send({test:true})
        })
    }
}

