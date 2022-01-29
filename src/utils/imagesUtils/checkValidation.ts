import express from 'express';
import fs from 'fs';
import path from 'path';
import { handleRequest } from './handleGET';

const checkFileExist = (filename: string): boolean => {
  const imagePath = path.resolve('./images', filename + '.jpg');

  try {
    if (fs.existsSync(imagePath)) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const checkValidation = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const fileName = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // File name is not provided in the query
  if (!fileName) {
    res.status(422).send('File name is missing');
  }

  // Either width or height or both values are not provided
  else if (isNaN(width) || isNaN(height)) {
    res.status(422).send('Invalid input for width or height');
  }

  // Checking if the file name provided exists
  else if (!checkFileExist(fileName)) {
    res.status(404).send('File name not found');
  }

  // Otherwise, handle the request safely
  else {
    handleRequest(res, fileName, width, height);
  }

  next();
};

export default checkValidation;
