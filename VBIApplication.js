'use strict';

const promClient = require('prom-client');
const basicAuth = require('express-basic-auth');
const { Pool } = require("pg");
const dotenv = require("dotenv");


//declare the metrics
//TODO   - move to a separate file.
const NDEVICE_REQUEST = new promClient.Counter({
      name: 'vbi_requests',
      help: 'Number of request to VBI app',
});
const RESPONSE_TIME_MS =  new promClient.Histogram({
    name: 'vbiapp_response_time',
    help: 'VBI app response time',
    type: 'histogram',
    buckets: [1,2,5,10,20,50,100,200,500]
            
});

class VBIApplication {

    constructor(app, logger) {
        this.logger=logger;
        this.app = app;
        this.playlists = {};
        this.db_connected = false;
        this.start();
    }
    
    async start() {
        let  self=this;
        
        try {
            dotenv.config();


            this.pool = new Pool({
                user: process.env.PGUSER?process.env.PGUSER:'postgres',
                host: process.env.PGHOST?process.env.PGHOST:'localhost',
                database: process.env.PGDATABASE?process.env.PGDATABASE:'vbi',
                password: process.env.PGPASSWORD?process.env.PGPASSWORD:'password',
                port: process.env.PGPORT?process.env.PGPORT:5432,
            });

            await this.pool.connect();
            this.db_connected = true;
        }catch (error) {
            this.logger.error('Error while connecting to db ',error);
        }
        
        //Add a sample song
        //TODO remove this later after testing.
        this.playlists['Anantha_playlist']= [{
            Songtitle: 'Song 1',
            Singers: 'Singer 1',
            Album: 'Private',
            Play_Time: '230s'
        }];
        
        //Created basic auth
        this.cfgAuth = basicAuth({
            authorizer: this.cfgAuthorizer.bind(this),
            authorizeAsync: true,
            challenge: true
        });

        this.app.get('/status', async (req, res) => {
            //check and provide the status.
            res.status(200).send(this.db_connected?"DB connected":"DB not connected");
        });
        
        this.app.get('/listsongs',this.cfgAuth, async (req, res) => {
            const end = RESPONSE_TIME_MS.startTimer();
            try {
                NDEVICE_REQUEST.inc(); 
                let result = await this.pool.query('SELECT * FROM songs_table')
                this.logger.noise('DB result is',result);
                res.status(200).send(JSON.stringify(result.rows)); 
            } catch (e) {
                self.logger.debug('Error in /listsongs', e.stack);
                res.status(500).send();
            }
            end();
        });
        
        this.app.get('/getPlayList',this.cfgAuth, async (req, res) => {
            const end = RESPONSE_TIME_MS.startTimer();
            try {
                NDEVICE_REQUEST.inc(); 
                if( !('playListName' in req.body )) {
                    self.logger.debug('addSongToPlayList: Playlist name missing');
                    res.status(400).send('Missing Playlist name in request body');
                    return;
                }
                let result = await this.pool.query('select songs_table.id,songs_table.song_title, songs_table.singer, songs_table.album, songs_table.duration from songs_table INNER JOIN PlayList ON PlayList.PlayListName=\''+req.body.playListName+'\' and PlayList.Song_id = songs_table.id')
                this.logger.noise('DB result is',result);
                res.status(200).send(JSON.stringify(result.rows)); 
            } catch (e) {
                self.logger.debug('Error in /getPlayList', e.stack);
                res.status(500).send();
            }
            end();
        });
        
        this.app.post('/addSongToPlayList',this.cfgAuth, async (req, res) => {
            const end = RESPONSE_TIME_MS.startTimer();
            try {
                NDEVICE_REQUEST.inc();
                if( !('playListName' in req.body )) {
                    self.logger.debug('addSongToPlayList: Playlist name missing');
                    res.status(400).send('Missing Playlist name in request body');
                    return;
                }
                
                if( !('song' in req.body )) {
                    self.logger.debug('addSongToPlayList: Song name missing');
                    res.status(400).send('Missing Song name in request body');
                    return;
                }
                
                let result = await this.pool.query('insert into PlayList(PlayListName,Song_id) values (\''+req.body.playListName+'\',\''+req.body.song+'\');')
                this.logger.noise('DB result is',result);
                res.status(200).send('Song added to playlist');
                
            }catch (e) {
                self.logger.debug('Error in /addSongToPlayList', e.stack);
                res.status(500).send();
            }
            end();
        });
        
        
        this.app.get('/shufflePlaylist',this.cfgAuth, async (req, res) => {
            const end = RESPONSE_TIME_MS.startTimer();
            try {
                NDEVICE_REQUEST.inc(); 
                if( !('playListName' in req.body )) {
                    self.logger.debug('addSongToPlayList: Playlist name missing');
                    res.status(400).send('Missing Playlist name in request body');
                    return;
                }
                let result = await this.pool.query('select songs_table.id,songs_table.song_title, songs_table.singer, songs_table.album, songs_table.duration from songs_table INNER JOIN PlayList ON PlayList.PlayListName=\''+req.body.playListName+'\' and PlayList.Song_id = songs_table.id')
                this.logger.noise('DB result is',result);
                console.log(result.rows);
                result.rows.sort(() => Math.random() - 0.5)
                res.status(200).send(JSON.stringify(result.rows)); 
            } catch (e) {
                self.logger.debug('Error in /shufflePlaylist', e.stack);
                res.status(500).send();
            }
            end();
        });
        
        
    }
    
    
    async cfgAuthorizer(username, password, cb) {
        // TODO - do all use auth. For now username and password harcoded.
        if ( username == "default" && password == "password") 
            return cb(null, true);
        return cb(null, false);
    }
    
    
            
}

module.exports = VBIApplication;

