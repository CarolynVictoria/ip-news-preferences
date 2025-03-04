import axios from 'axios';

const API_BASE_URL = '/api'; // Vite proxy handles this

export async function fetchMailingLists() {
	const response = await axios.get(`${API_BASE_URL}/mailing-lists`);
	return response.data;
}
