import axios from 'axios';

const API_URL = 'https://api-esp.piano.io/publisher/pub/1048/sq';
const PIANO_ESP_API_BASE_URL = 'https://api-esp.piano.io';

async function fetchFilteredMailingLists() {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY;
	console.log('fetchFilteredMailingLists - Using API Key:', PIANO_ESP_API_KEY);

	const response = await axios.get(`${API_URL}?api_key=${PIANO_ESP_API_KEY}`);
	const allLists = response.data;

	return allLists.filter(
		(list) => list.Active === 1 && list.HideOnSubPage === 0
	);
}

/**
 * Combines subscribing to lists and setting merge fields into a single request.
 * This is the correct method per Piano ESP 2.0 documentation.
 */
async function addSubscriberToLists(email, mailingListIds, mergeFields) {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY;

	const url = `${PIANO_ESP_API_BASE_URL}/tracker/securesub?api_key=${PIANO_ESP_API_KEY}`;

	// Combine lists and merge fields into one payload
	const payload = {
		email,
		mlids: mailingListIds,
		mergeField: {
			NAME_FIRST: mergeFields?.NAME_FIRST || '',
			NAME_LAST: mergeFields?.NAME_LAST || '',
		},
	};

	console.log('addSubscriberToLists - Payload:', payload);

	const response = await axios.post(url, payload, {
		headers: { 'Content-Type': 'application/json' },
	});

	console.log('addSubscriberToLists - Response:', response.data);
	return response.data;
}

// Note: The updateSubscriberMergeFields function is removed completely, because it's unnecessary.

export { fetchFilteredMailingLists, addSubscriberToLists };
