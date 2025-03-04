import { useEffect, useState } from 'react';
import { fetchMailingLists } from './clientApi.js';
import Toggle from './Toggle.jsx';
import mockMailingLists from './mockData.js';


function App() {
	const [mailingLists, setMailingLists] = useState([]);
	const [selectedLists, setSelectedLists] = useState({});

	useEffect(() => {
		const loadLists = async () => {
			const lists = await fetchMailingLists();
			setMailingLists(lists);

			// Initialize toggle state (unsubscribed by default, or populate from user data if you want)
			const initialSelection = lists.reduce((acc, list) => {
				acc[list.mailing_list_id] = false; // Assume not subscribed
				return acc;
			}, {});
			setSelectedLists(initialSelection);
		};

		loadLists();
	}, []);

	const toggleList = (id) => {
		setSelectedLists((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const handleSubmit = () => {
		console.log('Preferences being submitted:', selectedLists);
		// This would call another clientApi function like `savePreferences()` to your proxy
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>
				Manage Your Newsletter Preferences
			</h1>

			<div className='space-y-2'>
				{mailingLists.map((list) => (
					<Toggle
						key={list.mailing_list_id}
						label={list.name}
						checked={selectedLists[list.mailing_list_id]}
						onChange={() => toggleList(list.mailing_list_id)}
					/>
				))}
			</div>

			<button className='mt-4 btn btn-primary' onClick={handleSubmit}>
				Save Preferences
			</button>
		</div>
	);
}

export default App;
