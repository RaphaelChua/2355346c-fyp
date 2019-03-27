/**
 * Express configuration
 *
 * @exports app: configured express instance
 */

import express from 'express';
import ejs from 'ejs';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import config from 'nconf';
import cors from 'cors';
import MainRouter from '../routes';

const app = express();

const env = app.get('env');


export function init(){

    // enable cross origins resource sharing
    app.use(cors());
    app.use(helmet());
    app.disable('x-powered-by');
    app.enable('trust proxy');
    app.set('appRootPath', path.join(process.cwd(), '../client'));
    app.use(express.static(path.join(process.cwd(), '../client')));
    app.use(morgan('combined'));
    app.set('views', [
        app.get('appRootPath')
      ]);
    app.set('view engine', 'ejs');
    app.engine('ejs', ejs.renderFile);
    // compress all requests
    app.use(compression());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
      }));
    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(MainRouter);

    app.use(express.static(path.join(__dirname,'video')))

    // error handling
    app.use(function handleErrors(err, req, res, next) {

        if (env === 'local') console.log(err.stack)
        else {
          delete err.stack;
        }
    
        var statusCode = err.output ? err.output.statusCode : 500;
        if (!res.headersSent) {
          res.status(err.status || statusCode).json(err);
        }
      });
}


export function getAppInstance(){
  return app;
}
