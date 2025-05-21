import express from 'express';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for client requests
app.use(cors());
app.use(express.json());


import urlRouter from './routes/urlRouter.js';

app.use('/api', urlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);

