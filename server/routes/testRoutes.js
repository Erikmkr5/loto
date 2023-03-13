

class TestRoutes {
    constructor(app = null){
        this.app = app || global.app
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

//const testRoutes = new TestRoutes()

module.exports = TestRoutes
