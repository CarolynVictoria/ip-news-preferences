import { useEffect, useState } from 'react';
import Toggle from './Toggle.jsx';
import { fetchMailingLists } from './clientApi.js';
import mailingListMetadata from './mailingListMetadata.js';
import NameEmailForm from './NameEmailForm.jsx';

function App() {
	const [mailingLists, setMailingLists] = useState([]);
	const [selectedLists, setSelectedLists] = useState({});

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [isKnownSubscriber, setIsKnownSubscriber] = useState(false);

	useEffect(() => {
		const loadLists = async () => {
			try {
				const lists = await fetchMailingLists();

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

				// Detect known subscriber (from URL parameter)
				const urlParams = new URLSearchParams(window.location.search);
				const presetEmail = urlParams.get('email');

				if (presetEmail) {
					setEmail(presetEmail);
					setIsKnownSubscriber(true);
				}
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

	const handleSubmit = async () => {
		try {
			const selectedMailingListIds = Object.entries(selectedLists)
				.filter(([_, isChecked]) => isChecked)
				.map(([id]) => parseInt(id, 10));

			console.log('Submitting preferences for:', {
				email,
				selectedMailingListIds,
				firstName,
				lastName,
			});

			// Single call to /subscribe — including both lists and merge fields
const payload = {
	email,
	mailingListIds: selectedMailingListIds,
	firstName,
	lastName,
};


			console.log('Sending to /subscribe:', payload);

			const response = await fetch('/api/subscriber/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Subscribe response error:', errorText);
				throw new Error('Failed to save preferences');
			}

			console.log('Successfully saved preferences.');

			alert('Preferences saved successfully!');
		} catch (error) {
			console.error('Error saving preferences:', error);
			alert('Failed to save preferences. Please try again.');
		}
	};

	return (
		<div className='min-h-screen bg-white text-gray-800 w-full flex justify-center'>
			<div className='w-full max-w-6xl p-6'>
				<h1 className='text-3xl font-bold mb-6'>
					Manage Your Newsletter Preferences
				</h1>

				<NameEmailForm
					email={email}
					setEmail={setEmail}
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
					isKnownSubscriber={isKnownSubscriber}
				/>

				<p className='text-gray-600 mb-6'>
					Select which newsletters you’d like to receive. Funding News & Tips is
					our flagship newsletter. We also offer topical newsletters, a weekly
					roundup and Saturday Toplines. Update your preferences anytime.
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
