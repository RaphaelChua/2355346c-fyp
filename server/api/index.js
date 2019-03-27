import { Router } from 'express';
const router = Router();

/* TEST API */
router.use('/tests',require('./tests'));

/* MAIN API */
router.use('/validator',require('./validator'));
router.use('/transaction',require('./transaction'));
router.use('/account',require('./account'));
router.use('/contract',require('./contract'));
router.use('/location',require('./location'));
router.use('/sensors',require('./sensors'));

module.exports = router;  