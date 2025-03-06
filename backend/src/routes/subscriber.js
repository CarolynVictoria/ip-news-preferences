// /backend/src/routes/subscriber.js
import express from 'express';
import {
	addSubscriberToLists,
	updateSubscriberMergeFields,
} from '../apiService.js';

const router = express.Router();

// Subscribe user to mailing lists and update merge fields (first name, last name)
router.post('/subscribe', async (req, res) => {
	try {
		const { email, mailingListIds, firstName, lastName } = req.body;

		if (
			!email ||
			!Array.isArray(mailingListIds) ||
			mailingListIds.length === 0
		) {
			return res
				.status(400)
				.json({
					error: 'Email and at least one mailing list ID are required.',
				});
		}

		// Step 1: Subscribe to mailing lists
		const listResult = await addSubscriberToLists(email, mailingListIds);

		// Step 2: Update merge fields (first name, last name)
		const mergeFields = {
			NAME_FIRST: firstName,
			NAME_LAST: lastName,
		};
		const mergeResult = await updateSubscriberMergeFields(email, mergeFields);

		res.json({
			success: true,
			listResult,
			mergeResult,
		});
	} catch (error) {
		console.error('Error in /subscribe:', error.message);
		res
			.status(500)
			.json({ error: 'Failed to subscribe and update merge fields' });
	}
});

// Update merge fields only (first name, last name)
// This is kept if you want the ability to update merge fields independently later.
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
