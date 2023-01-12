// This app if for vbi music app.
const express = require('express');
const os = require('os');
const net = require('net');
const bodyParser = require('body-parser');
const promClient = require('prom-client');

const { Logger }=require('./logger');
const VBIApplication=require('./VBIApplication.js');

        
class VBIApp {

    constructor() {
        this.start();
        logger.noise('VBIApp started');
    }
    
    sleep(x) {
        return new Promise((resolve) => {  setTimeout(resolve, x);  });
    }

    async start() {
        // initiliaze metrics
        this.init_metrics();
        
        let self=this;
        
        // create express app server.
        const app = express();
        app.use(bodyParser.json());
        
        // TODO implement healthcheck api for this server with dependecies status.
        app.get('/health', (req,res) => {
             res.status(200).send();
        });
        
        
        //expose prometheus metrics for monitoring the app.
        app.get('/metrics', (req, res) => {
            res.status(200).set('Content-Type', 'text/plain');
            res.end(promClient.register.metrics());
        });
        

        
        new VBIApplication(app, logger);
        
        app.listen(3000);

    }
    
    async init_metrics() {
        promClient.collectDefaultMetrics({ timeout: 5000 });
        //NDEVICE_REQUEST.inc(0);
    }
}


function main(){
    new VBIApp();
    
    process.on('uncaughtException', (err) => {
        logger.error('CRASH : uncaughtException '+JSON.stringify(err.stack));
        process.exit(1); 
    });
        
    process.on('unhandledRejection', (err) => {
        logger.error('CRASH : unhandledRejection '+JSON.stringify(err.stack));
        process.exit(1);
    });
	
    process.on('SIGTERM', () => {
        logger.info('Shutdown of vbi app SIGTERM');
        process.exit(0);
    });
        
    process.on('SIGINT', () => {
        logger.info('Shutdown of vbi app SIGINT');
        process.exit(0);
    });
}
let logger=new Logger('vbiapp',5);
main(); 