import { useEffect, useState } from 'react';
import Toggle from './Toggle.jsx';
import { fetchMailingLists } from './clientApi.js';
import mailingListMetadata from './mailingListMetadata.js';
import EmailSubscribeForm from './EmailSubscribeForm.jsx'; 

function App() {
	const [mailingLists, setMailingLists] = useState([]);
	const [selectedLists, setSelectedLists] = useState({});

	// New fields for user details
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const loadLists = async () => {
			try {
				const lists = await fetchMailingLists();

				// Inject metadata from external file
				const listsWithMetadata = lists.map((list) => ({
					...list,
					sortOrder: mailingListMetadata[list.Id]?.sortOrder ?? 999,
					description: mailingListMetadata[list.Id]?.description ?? '',
				}));

				listsWithMetadata.sort((a, b) => a.sortOrder - b.sortOrder);

				setMailingLists(listsWithMetadata);

				const initialSelection = listsWithMetadata.reduce((acc, list) => {
					acc[list.Id] = false;
					return acc;
				}, {});
				setSelectedLists(initialSelection);
			} catch (error) {
				console.error('Error fetching mailing lists:', error);
			}
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
		console.log('Preferences being submitted:', {
			firstName,
			lastName,
			email,
			selectedLists,
		});
		// You can replace this with actual API call to save preferences
	};

	return (
		<div className='min-h-screen bg-white text-gray-800 w-full flex justify-center'>
			<div className='w-full max-w-6xl p-6'>
				<h1 className='text-3xl font-bold mb-6'>
					Manage Your Newsletter Preferences
				</h1>

				{/* New Email Subscribe Form */}
				<EmailSubscribeForm />

				<p className='text-gray-600 mb-6'>
					Select which newsletters you’d like to receive. Uncheck to
					unsubscribe. You can update your preferences at any time.
				</p>

				<div className='space-y-4'>
					{mailingLists.map((list) => (
						<div
							key={list.Id}
							className='w-full bg-gray-50 rounded-lg shadow-sm p-4 flex items-center justify-between'
						>
							<div className='pr-4'>
								<p className='text-lg font-semibold'>{list.Name}</p>
								{list.description && (
									<p className='text-gray-600 text-sm mt-1'>
										{list.description}
									</p>
								)}
							</div>
							<Toggle
								checked={selectedLists[list.Id]}
								onChange={() => toggleList(list.Id)}
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
