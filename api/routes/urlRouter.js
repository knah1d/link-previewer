import express from 'express';
import {getUrl} from '../controllers/urlController.js';


const router = express.Router();

router.post('/preview', getUrl);

export default router;