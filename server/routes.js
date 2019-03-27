'use strict';
import {Router} from 'express';

const router = Router();

// based route for custom rest api
router.use('/api/',require('./api'));

// renders client/index.js 
// but we wont use this yet.
router.get('/*',function(req,res){
    // res.render('index');
    res.status(404).send("Sorry, API not found")
});
module.exports = router;