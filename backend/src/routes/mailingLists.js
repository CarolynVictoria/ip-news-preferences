// backend/src/routes/mailingLists.js
import express from 'express';
import { fetchMailingLists } from '../apiService.js';

const router = express.Router();

router.get('/mailing-lists', async (req, res) => {
	try {
		const lists = await fetchMailingLists();
		res.json(lists);
	} catch (error) {
		console.error('Proxy error fetching lists:', error.message);
		res.status(500).json({ error: 'Failed to fetch mailing lists' });
	}
});

export default router;
