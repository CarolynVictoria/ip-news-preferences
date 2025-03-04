import axios from 'axios';

export const fetchMailingLists = async () => {
	const response = await axios.get('/api/mailing-lists');
	return response.data;
};
