import express from 'express';
import fs from 'fs'
import { promises as fsPromises } from 'fs';
import { Http2ServerResponse } from 'http2';
import sharp from 'sharp'

const app = express();

const port = 3000;

const images = ['encenadaport.jpg', 'fjord.jpg', 'icelandwaterfall.jpg', 'palmtunnel.jpg', 'santamonica.jpg']


app.listen(port, (()=>{
  console.log(`The server has been se up on port ${port}`);
}));

app.get('/images', (req,res)=>{

  const fileName = req.query.filename as string
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string
  
  getMetadata(fileName)
  resizeImage(fileName,width,height).then(()=>
  showImage(res, fileName))
  
  
})

  const getMetadata = async (fileName: string) => {
  try {
    const metadata = await sharp(`./images/${fileName}.jpg`).metadata();
  // console.log(metadata);
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`)
  }
}


const resizeImage = async (fileName:string, width: string, height: string) => {
  console.log(height,width)
  try {
    await sharp(`./images/${fileName}.jpg`)
      .resize({
        width: parseInt(width),
        height: parseInt(height)
      })
      .toFile(`./image-resized/${fileName}.jpg`);
  } catch (error) {
    console.log(error);
  }
}

const showImage = (res: any, fileName: string) => {
  fs.readFile(`./image-resized/${fileName}.jpg`, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
  })
}

  // res.send('Converting now...');
  // csv().fromFile(inputFile).then((data)=>{
  //   let newData = data.map(
  //     (item:{ first_name: string, last_name: string, phone: string
  //   })=>{
  //       let firstName = item.first_name;
  //       let secondtName = item.last_name;
  //       let phone = item.phone;

  //       if (item.phone === ''){
  //         phone = 'empty cell';
  //       }
  //       return {firstName, secondtName, phone};
  //     });

  //   fsPromises.writeFile(outputFile, JSON.stringify(newData));
  // });