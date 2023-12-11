import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const router = express.Router();

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydata',
  password: 'Download1@323',
  port: 5432, // Default PostgreSQL port
});

router.use(express.json());

// Endpoint to retrieve information about yourself
router.get('/awesome/applicant', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM info where id= $1',[1]); // Adjust ID as needed
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/awesome/applicant', async (req: Request, res: Response) => {
  const { firstname, lastname, email, number } = req.body;
  try {
    await pool.query('INSERT INTO info (firstname,lastname,email,number) VALUES ($1, $2, $3, $4)',
     [firstname,lastname,email,number]);
    res.status(201).json({ message: 'Data added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/awesome/applicant/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname, email, number } = req.body;
  try {
    await pool.query('UPDATE info SET firstname = $1, lastname = $2, email = $3, number = $4 WHERE id = $4', 
        [firstname,lastname,email,number,id]);
    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/awesome/applicant/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM info WHERE id = $1', [id]);
    res.json({ message: 'Data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
