const express = require('express')
const {PORT, modoCluster} = require('./configuration/config')
require('dotenv').config({ path: __dirname+'/.env' })

//routers
const mainRouters = require('./routes/main')

//childprocess
const {fork} = require('child_process')

//clusters
const cluster = require('cluster')
const numCpus = require('os').cpus().length

if((modoCluster === "CLUSTER") && cluster.isPrimary) {
    for(let i=0; i<numCpus; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        cluster.fork()
    })
} else {
    //init server
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    //routas
    app.get('/', (req, res) => {res.json('Welcome to Aripto')})
    app.use('/', mainRouters)

    //server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
    app.on('error', error => console.log(`Error en servidor ${error}`))
}