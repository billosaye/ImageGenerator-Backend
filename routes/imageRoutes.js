import express from 'express';
import { generateImage, getImages } from '../controllers/imageController.js';

export const router = express.Router();

router.post('/generate-image', generateImage);
router.get('/images', getImages);