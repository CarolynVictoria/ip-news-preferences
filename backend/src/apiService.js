import axios from 'axios';

const PIANO_API_BASE = process.env.PIANO_API_BASE;
const API_KEY = process.env.PIANO_ESP_API_KEY;

const mailingListOrder = {
	'list-id-123': 1,
	'list-id-456': 2,
	'list-id-789': 3,
};

export const fetchMailingLists = async () => {
	const response = await axios.get(`${PIANO_API_BASE}v3/mailing-list/list`, {
		headers: { 'X-API-KEY': API_KEY },
	});
	let mailingLists = response.data.mailing_lists || [];

	// Filter only "Active" and "Showable"
	mailingLists = mailingLists.filter(
		(list) => list.status === 'active' && list.is_hidden === false
	);

	// Assign ordering (optional)
	mailingLists.forEach((list) => {
		list.order = mailingListOrder[list.mailing_list_id] || 999;
	});

	// Sort by order
	mailingLists.sort((a, b) => a.order - b.order);

	return mailingLists;
};