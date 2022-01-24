import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

let resizedImages: {fileName: string, width: number, height:number}[] = [];

export let fileFound: boolean = false;

/*
* responsible to handle the GET request coming from '/images' route
*/
const handleRequest = (res: express.Response, fileName: string, width: number, height: number) :void=>{

  resizedImages.find(item => {
    if (item.fileName === fileName && item.width === width && item.height === height){
      fileFound = true;
      showImage(res, fileName);
    }
  });

  if (resizedImages.length === 0 || !fileFound){
    resizeImage(fileName,width,height).then(()=>
      showImage(res, fileName));
  }
};

/*
* This function was built up to resize the image
*/
const resizeImage = async (fileName:string, width: number, height: number) => {
  try {
    await sharp(`./images/${fileName}.jpg`)
      .resize({
        width: width,
        height: height
      })
      .toFile(`./image-resized/${fileName}.jpg`);
    resizedImages.push({fileName, width, height});
  } catch (error) {
    console.log(error);
  }
};

/*
* This function is responsible for showing the image after retrieving and reading it from which folder it was saved in
*/
const showImage = (res: express.Response, fileName: string) => {
  fs.readFile(`./image-resized/${fileName}.jpg`, function (err, content) {
    if (err) {
      // the input name is valid but does not exist
      if(fileName.length !== 0){
        res.header({'Content-type':'text/html'});
        res.status(404);
        console.log(err);
        res.end('404 NOT FOUND');
      }
    } else {
      res.header({'Content-type':'image/jpg'});
      res.status(200);
      res.end(content);
    }
  });
};

export default handleRequest;