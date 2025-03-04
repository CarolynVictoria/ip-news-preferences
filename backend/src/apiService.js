import axios from 'axios';

const API_URL = 'https://api-esp.piano.io/publisher/pub/1048/sq';

export async function fetchFilteredMailingLists() {
	const API_KEY = process.env.PIANO_ESP_API_KEY; // <- Move this inside!
	console.log('fetchFilteredMailingLists - Using API Key:', API_KEY); // Optional debug

	const response = await axios.get(`${API_URL}?api_key=${API_KEY}`);
	const allLists = response.data;

	return allLists.filter(
		(list) => list.Active === 1 && list.HideOnSubPage === 0
	);
}