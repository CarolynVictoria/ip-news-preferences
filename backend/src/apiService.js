import axios from 'axios';

const API_URL = 'https://api-esp.piano.io/publisher/pub/1048/sq';
const PIANO_ESP_API_BASE_URL = 'https://api-esp.piano.io'; // This can stay as a constant if you want

export async function fetchFilteredMailingLists() {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY; // ✅ Read dynamically
	console.log('fetchFilteredMailingLists - Using API Key:', PIANO_ESP_API_KEY);

	const response = await axios.get(`${API_URL}?api_key=${PIANO_ESP_API_KEY}`);
	const allLists = response.data;

	return allLists.filter(
		(list) => list.Active === 1 && list.HideOnSubPage === 0
	);
}

export async function addSubscriberToLists(email, mailingListIds) {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY; // ✅ Read dynamically
	const url = `${PIANO_ESP_API_BASE_URL}/tracker/securesub?api_key=${PIANO_ESP_API_KEY}`;

	const payload = {
		email,
		mlids: mailingListIds,
	};

	const response = await axios.post(url, payload, {
		headers: { 'Content-Type': 'application/json' },
	});

	return response.data; // This is the "subscribed to: ..." string
}

export const updateSubscriberMergeFields = async (email, mergeFields) => {
	const PIANO_ESP_API_KEY = process.env.PIANO_ESP_API_KEY; // ✅ Read dynamically
	const url = `${PIANO_ESP_API_BASE_URL}/tracker/securesub/mergefields?api_key=${PIANO_ESP_API_KEY}`;

	const payload = {
		email,
		merge_fields: mergeFields,
	};

	const response = await axios.post(url, payload, {
		headers: { 'Content-Type': 'application/json' },
	});

	return response.data;
};
