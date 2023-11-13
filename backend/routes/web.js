import express from 'express'

import TblController from '../controllers/tblController.js';
import SaveController from '../controllers/saveController.js';

const router = express.Router();

 
router.get('/tbl',TblController.getAllDoc)
router.post('/tbl',SaveController.saveData)

export default router