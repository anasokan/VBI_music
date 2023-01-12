/**
 * Simple logger class. 
 */
// 0 - no, 1 - error, 2 - warn, 3 - info, 4 - debug, 5 - noise 
// env LOG_LEVEL determines the current log level.
class Logger {

    constructor(id,level) {
        this.level=4;
        this.id=id;
        let log_level= process.env.LOG_LEVEL ? process.env.LOG_LEVEL : -1;
        log_level= level? level: log_level;
        log_level= parseInt(log_level,10);
        this.level = log_level;
    }

    noise(...args){ if( this.level > 4 )console.log(new Date(), this.id, ...args); }
    debug(...args){ if( this.level > 3 )console.log(new Date(), this.id, ...args); }
    log(...args)  { if( this.level > 3 )console.log(new Date(), this.id, ...args); }
    error(...args){ if( this.level > 0 )console.log(new Date(), this.id, ...args); }
    info(...args) { if( this.level > 2 )console.log(new Date(), this.id, ...args); }
    warn(...args) { if( this.level > 1 )console.log(new Date(), this.id, ...args); }
    child() { return this; }
}

module.exports={
    Logger,
};