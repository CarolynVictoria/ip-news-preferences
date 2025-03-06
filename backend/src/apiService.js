import axios from 'axios';

const API_URL = 'https://api-esp.piano.io/publisher/pub/1048/sq';
const PIANO_ESP_API_BASE_URL = 'https://api-esp.piano.io';
const PUBLISHER_ID = '1048'; // This should match your site ID from Piano ESP.

/**
 * Fetches the mailing lists for the site and filters them to only active, showable lists.
 */
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
 * Subscribes user to mailing lists only.
 * This does NOT update merge fields.
 */
async function addSubscriberToLists(email, mailingListIds) {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY;

	const url = `${PIANO_ESP_API_BASE_URL}/tracker/securesub?api_key=${PIANO_ESP_API_KEY}`;

	const payload = {
		email,
		mlids: mailingListIds,
	};

	console.log('addSubscriberToLists - Payload:', payload);

	const response = await axios.post(url, payload, {
		headers: { 'Content-Type': 'application/json' },
	});

	console.log('addSubscriberToLists - Response:', response.data);
	return response.data;
}

/**
 * Updates subscriber merge fields (first name, last name).
 * This uses the correct dedicated endpoint: /userdata/umfval/pub/{pubid}/set
 */
async function updateSubscriberMergeFields(email, mergeFields) {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY;

	const url = `${PIANO_ESP_API_BASE_URL}/userdata/umfval/pub/${PUBLISHER_ID}/set?api_key=${PIANO_ESP_API_KEY}`;

	// Piano expects an array of objects, each specifying user, umf (field name), and value.
	const payload = [
		{
			user: email,
			umf: 'NAME_FIRST',
			value: mergeFields.NAME_FIRST,
		},
		{
			user: email,
			umf: 'NAME_LAST',
			value: mergeFields.NAME_LAST,
		},
	];

	console.log(
		'updateSubscriberMergeFields - Payload:',
		JSON.stringify(payload, null, 2)
	);

	const response = await axios.post(url, payload, {
		headers: { 'Content-Type': 'application/json' },
	});

	console.log('updateSubscriberMergeFields - Response:', response.data);
	return response.data;
}

export {
	fetchFilteredMailingLists,
	addSubscriberToLists,
	updateSubscriberMergeFields,
};
