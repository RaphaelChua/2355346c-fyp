'use strict';
import nconf from 'nconf';
import fs from 'fs';
import path from 'path';

// const ip = path.resolve(__dirname,"..","..","..",".env");
var env = process.env.NODE_ENV || 'development';
// require('dotenv').config({path:ip})
// console.log(process.env.IP_ADDRESS);

export function init(){
nconf.env();

  /**
   * Verify Config file exist
   */
  const configFilePath = path.join(__dirname, env + '.json');
  try {
    fs.accessSync(configFilePath, fs.F_OK);
  }
  catch (err) {
    console.log("Configuration file does not exist for current environment");
    process.exit(1);
  }
  if(env == 'development'){
    console.log("Project currently in development stage.");
    nconf.file({file:configFilePath}).defaults(require('./development.json'));
   // nconf.file({file:configFilePath}).defaults(require('./development.json'));
  }
  else if (env == 'production')
  {
    console.log("Project currently in production stage.");
        nconf.file({file:configFilePath}).defaults(require('./production.json'));
 //   nconf.file({file:configFilePath}).defaults(require('./production.json'));
  }

}