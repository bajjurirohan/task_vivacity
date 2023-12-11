import express, { Request, Response } from 'express';
import applicantRoutes from './routes/applicantRoutes'; // Import the route handler

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
   });

app.use('/api', applicantRoutes); // Use the route handler

const server=app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;