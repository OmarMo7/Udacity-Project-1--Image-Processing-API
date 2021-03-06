import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

let resizedImages: { fileName: string; width: number; height: number }[] = [];

export let fileFound: boolean = false;

/*
 * responsible to handle the GET request coming from '/images' route
 */
export const handleRequest = (res: express.Response, fileName: string, width: number, height: number): void => {
  resizedImages.find((item) => {
    if (item.fileName === fileName && item.width === width && item.height === height) {
      fileFound = true;
      showImage(res, fileName);
    }
  });

  if (resizedImages.length === 0 || !fileFound) {
    resizeImage(fileName, width, height).then(() => showImage(res, fileName));
  }
};

/*
 * This function was built up to resize the image
 */
export const resizeImage = async (fileName: string, width: number, height: number): Promise<any> => {
  try {
    const sharpInst = await sharp(`./images/${fileName}.jpg`)
      .resize({
        width: width,
        height: height,
      })
      .toFile(`./image-resized/${fileName}.jpg`);
    resizedImages.push({ fileName, width, height });
    const metadata = await sharp(`./image-resized/${fileName}.jpg`).metadata();
    return metadata;
  } catch (error) {
    console.log(error);
  }

  return {};
};

/*
 * This function is responsible for showing the image after retrieving and reading it from which folder it was saved in
 */
const showImage = (res: express.Response, fileName: string): void => {
  fs.readFile(`./image-resized/${fileName}.jpg`, function (err, content) {
    res.header({ 'Content-type': 'image/jpg' });
    res.status(200);
    res.end(content);
  });
};

module.exports = {
  resizeImage,
  handleRequest,
};
