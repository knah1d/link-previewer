import express from 'express';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


import urlRouter from './routes/urlRouter.js';

app.use('/api', urlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);

