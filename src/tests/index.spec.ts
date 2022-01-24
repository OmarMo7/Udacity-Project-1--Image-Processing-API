import supertest from 'supertest';
import {app} from '../index';

const request = supertest(app);

describe('Test different endpoint responses', ()=>{
  it('should get the endpoint successfully', async()=>{
    const fileName = 'icelandwaterfall';
    const width = '200';
    const height = '300';
    const response = await request.get(`/api/images?filename=${fileName}&width=${width}&height=${height}`);
    console.log(response);
    expect(response.status).toBe(200);
  });

  it('gets an error with 400 (Bad Request)', async()=>{
    const fileName2 = 'BlaBla';
    const width2 = '400';
    const height2 = '700';
    const response = await request.get(`/api/images?filename=${fileName2}&width=${width2}&height=${height2}`);
    expect(response.status).toBe(404);
  });

  it('should come up with -express validator- middleware error', async()=>{
    const fileName3 = '';
    const width3 = '400';
    const height3 = '700';
    const response = await request.get(`/api/images?filename=${fileName3}&width=${width3}&height=${height3}`);
    expect(response.status).toBe(400);
  });
});
