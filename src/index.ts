import express from 'express';
import fs from 'fs';
import sharp from 'sharp';
import { query, validationResult } from 'express-validator';

export const app = express();

const port = 3000;

export let resizedImages: {fileName: string, width: number, height:number}[] = [];

app.listen(port, (()=>{
  console.log(`The server has been se up on port ${port}`);
}));

app.get('/images', 
[
  query('filename').isString().withMessage('Only letters and digits allowed in title.').trim(),
  query('width').isNumeric(), 
  query('height').isNumeric()
] , (req: express.Request,res: express.Response)=>{

  const errors = validationResult(req);
  const fileName = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  let fileFound: boolean = false;
  if (!errors.isEmpty()) {
    console.log("error occured")
   return res.status(422).json({ errors: errors.array() });
  }
  const handleRequest = () :number=>{
    if (resizedImages.includes({fileName, width, height})){
      fileFound = true;
          showImage(res, fileName);
    }

    if (resizedImages.length === 0 || !fileFound){
      resizeImage(fileName,width,height).then(()=>
        showImage(res, fileName));
    }

    

    // fs.readdir(`./image-resized`, function (err, files){
    //   files.forEach((file) => {
    //     resizedImages.push(file)
    //   })
    // })

    return resizedImages.length
  };

  handleRequest()

});


const resizeImage = async (fileName:string, width: number, height: number) => {
  // console.log(height,width);
  try {
    await sharp(`./images/${fileName}.jpg`)
      .resize({
        width: width as number,
        height: height as number
      })
      .toFile(`./image-resized/${fileName}.jpg`);
    resizedImages.push({fileName, width, height});
  } catch (error) {
    console.log(error);
  }
};

const showImage = (res: any, fileName: string) => {
  fs.readFile(`./image-resized/${fileName}.jpg`, function (err, content) {
    if (err) {
      res.writeHead(400, {'Content-type':'text/html'});
      console.log(err);
      res.end('No such image');
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200,{'Content-type':'image/jpg'});
      res.end(content);
    }
  });
};



module.exports = {
app, // To test endpoints
resizedImages // To test if the promises resolves
// handleRequests .. to test if the caching works
}