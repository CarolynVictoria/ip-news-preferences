import { useEffect, useState } from 'react';
import Toggle from './Toggle.jsx';
import mockMailingLists from './mockData.js';

function App() {
	const [mailingLists, setMailingLists] = useState([]);
	const [selectedLists, setSelectedLists] = useState({});

	useEffect(() => {
		const loadLists = () => {
			const lists = [...mockMailingLists].sort(
				(a, b) => a.sortOrder - b.sortOrder
			); // ✅ Always sorted
			setMailingLists(lists);

			const initialSelection = lists.reduce((acc, list) => {
				acc[list.mailing_list_id] = false;
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
	};

	return (
		<div className='min-h-screen bg-white text-gray-800 w-full flex justify-center'>
			<div className='w-full max-w-6xl p-6'>
				<h1 className='text-3xl font-bold mb-6'>
					Manage Your Newsletter Preferences
				</h1>

				<p className='text-gray-600 mb-6'>
					Select which newsletters you’d like to receive. Uncheck to
					unsubscribe. You can update your preferences at any time.
				</p>

				<div className='space-y-4'>
					{mailingLists.map((list) => (
						<div
							key={list.mailing_list_id}
							className='w-full bg-gray-50 rounded-lg shadow-sm p-4 flex items-center justify-between'
						>
							<div className='pr-4'>
								<p className='text-lg font-semibold'>{list.name}</p>
								{list.description && (
									<p className='text-gray-600 text-sm mt-1'>
										{list.description}
									</p>
								)}
							</div>
							<Toggle
								checked={selectedLists[list.mailing_list_id]}
								onChange={() => toggleList(list.mailing_list_id)}
							/>
						</div>
					))}
				</div>

				<div className='mt-8'>
					<button
						className='bg-brand hover:bg-brand/90 text-white font-medium py-2 px-6 rounded-md'
						onClick={handleSubmit}
					>
						Save Preferences
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
