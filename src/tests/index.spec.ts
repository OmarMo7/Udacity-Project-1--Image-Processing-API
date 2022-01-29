import supertest from 'supertest';
import { app } from '../index';
import { resizeImage } from '../utils/imagesUtils/handleGET';
const request = supertest(app);

describe('Test image processing operation', (): void => {
  it('the resultant image should have the same width and height as intended ', async (): Promise<void> => {
    const fileName = 'icelandwaterfall';
    const width = 200; // intended width
    const height = 300; // intended height
    const resultantImage = await resizeImage(fileName, width, height);

    expect(resultantImage.width).toEqual(width);
    expect(resultantImage.height).toEqual(height);
  });

  it('the resultant image should have the same width and height as intended ', async (): Promise<void> => {
    const fileName = 'palmtunnel';
    const width = 1000; // intended width
    const height = 1000; // intended height
    const resultantImage = await resizeImage(fileName, width, height);

    expect(resultantImage.width).toEqual(width);
    expect(resultantImage.height).toEqual(height);
  });
});

describe('Test different endpoint requests', (): void => {
  it('should get the endpoint successfully', async (): Promise<void> => {
    const fileName = 'icelandwaterfall';
    const width = '200';
    const height = '300';
    const response = await request.get(`/api/images?filename=${fileName}&width=${width}&height=${height}`);
    expect(response.status).toBe(200);
  });

  it('should come up with invalid input for width or height error', async (): Promise<void> => {
    const fileName = 'fjord';
    const width = 'a';
    const height = '300';
    const response = await request.get(`/api/images?filename=${fileName}&width=${width}&height=${height}`);
    expect(response.status).toBe(422);
  });

  it('should come up with missing file name error', async (): Promise<void> => {
    const fileName3 = '';
    const width3 = '400';
    const height3 = '700';
    const response = await request.get(`/api/images?filename=${fileName3}&width=${width3}&height=${height3}`);
    expect(response.status).toBe(422);
  });

  it('should come up with file name not found', async (): Promise<void> => {
    const fileName3 = 'santamnica'; // File name is badly typed, the right name is santamonica
    const width3 = '400';
    const height3 = '700';
    const response = await request.get(`/api/images?filename=${fileName3}&width=${width3}&height=${height3}`);
    expect(response.status).toBe(404);
  });
});
