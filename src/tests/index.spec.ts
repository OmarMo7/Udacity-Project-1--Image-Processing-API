import supertest from 'supertest';
import { app } from '../index';
import { resizeImage } from '../utils/imagesUtils/handleGET';
const request = supertest(app);


describe('Test image processing operation', () => {
  it('the resultant image should have the same width and height as intended ', async () => {
    const fileName = 'icelandwaterfall';
    const width = 200; // intended width
    const height = 300; // intended height
    const resultantImage = await resizeImage(fileName,width,height);

    expect(resultantImage.width).toEqual(width);
    expect(resultantImage.height).toEqual(height);
  });
});


describe('Test different endpoint responses', () => {
  beforeAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });
  it('should get the endpoint successfully', async () => {
    const fileName = 'icelandwaterfall';
    const width = '200';
    const height = '300';
    const response = await request.get(`/api/images?filename=${fileName}&width=${width}&height=${height}`);
    expect(response.status).toBe(200);
  });

  //    

  it('should come up with -express validator- middleware error', async () => {
    const fileName3 = '';
    const width3 = '400';
    const height3 = '700';
    const response = await request.get(`/api/images?filename=${fileName3}&width=${width3}&height=${height3}`);
    expect(response.status).toBe(400);
  });
});
