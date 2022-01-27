import express from 'express';
import { query, validationResult } from 'express-validator';
import {handleRequest} from '../utils/imagesUtils/handleGET';

const router = express.Router();

router.get(
  '/images',
  query('filename').exists({ checkFalsy: true }).withMessage('This field cannot be empty!'),
  query('width').exists({ checkFalsy: true }),
  query('height').exists({ checkFalsy: true }),
  (req: express.Request, res: express.Response): any => {
    const errors = validationResult(req);

    const fileName = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    handleRequest(res, fileName, width, height);
  },
);

export default router;
