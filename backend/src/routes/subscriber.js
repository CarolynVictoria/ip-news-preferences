// /backend/src/routes/subscriber.js

import express from 'express';
import {
	addSubscriberToLists,
	updateSubscriberMergeFields,
} from '../apiService.js';

const router = express.Router();

// Subscribe user to mailing lists
router.post('/subscribe', async (req, res) => {
	const { email, mailingListIds } = req.body;

	if (!email || !Array.isArray(mailingListIds)) {
		return res
			.status(400)
			.json({ error: 'Email and mailingListIds are required.' });
	}

	try {
		const result = await addSubscriberToLists(email, mailingListIds);
		res.json({ message: result });
	} catch (error) {
		console.error('Error in /subscribe:', error.message);
		res.status(500).json({ error: 'Failed to subscribe user.' });
	}
});

// Update merge fields (first name, last name)
router.post('/mergefields', async (req, res) => {
	const { email, mergeFields } = req.body;

	if (!email || !mergeFields) {
		return res
			.status(400)
			.json({ error: 'Email and mergeFields are required.' });
	}

	try {
		const result = await updateSubscriberMergeFields(email, mergeFields);
		res.json({ message: result });
	} catch (error) {
		console.error('Error in /mergefields:', error.message);
		res.status(500).json({ error: 'Failed to update merge fields.' });
	}
});

export default router;
