import express from 'express';
import router from './routes/images';

export const app = express();
app.use(express.json());
app.use('/api', router);
const port = 3000;

app.listen(port, (()=>{
  console.log(`The server has been se up on port ${port}`);
}));

module.exports = {
  app
};