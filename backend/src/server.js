import express from 'express';
import cors from 'cors';
import mailingListsRouter from './routes/mailingLists.js';
import subscriberRoutes from './routes/subscriber.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('Loaded PIANO_ESP_API_KEY:', process.env.PIANO_ESP_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/mailing-lists', mailingListsRouter);
app.use('/api/subscriber', subscriberRoutes);

const PORT = process.env.BACKEND_PORT || 5505;
app.listen(PORT, () => {
	console.log(`Backend running on port ${PORT}`);
});
