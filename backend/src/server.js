import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mailingListsRouter from './routes/mailingLists.js';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 5505;

app.use(cors()); // Adjust if necessary
app.use(express.json());

app.use('/api', mailingListsRouter);

app.listen(PORT, () => {
	console.log(`Backend server running on port ${PORT}`);
});
