import express from 'express';
import { fetchFilteredMailingLists } from '../apiService.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const lists = await fetchFilteredMailingLists();
		res.json(lists);
	} catch (error) {
		console.error('Error in GET /mailing-lists:', error);
		res.status(500).json({ error: 'Failed to fetch mailing lists' });
	}
});

export default router;
