// /backend/src/routes/subscriber.js
import express from 'express';
import {
	addSubscriberToLists
} from '../apiService.js';

const router = express.Router();

// Subscribe user to mailing lists
router.post('/subscribe', async (req, res) => {
	try {
		const { email, mailingListIds, mergeFields } = req.body;

		// Pass both lists and mergeFields directly to addSubscriberToLists
		const result = await addSubscriberToLists(
			email,
			mailingListIds,
			mergeFields
		);

		res.json(result);
	} catch (error) {
		console.error('Error in /subscribe:', error.message);
		res
			.status(500)
			.json({ error: 'Failed to subscribe and update merge fields' });
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
