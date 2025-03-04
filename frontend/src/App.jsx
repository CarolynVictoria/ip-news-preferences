import { useEffect, useState } from 'react';
import Toggle from './Toggle.jsx';
import { fetchMailingLists } from './clientApi.js'; // ✅ Correct import from your actual file

function App() {
	const [mailingLists, setMailingLists] = useState([]);
	const [selectedLists, setSelectedLists] = useState({});

	useEffect(() => {
		const loadLists = async () => {
			try {
				const lists = await fetchMailingLists();

				// ✅ Hardcoded sort order & descriptions tied to Piano mailing list `Id`
				const metadata = {
					11847: {
						sortOrder: 1,
						description: "Get the latest on who's funding what and why.",
					},
					11704: {
						sortOrder: 2,
						description:
							'Topical news reports on philanthropy in arts & culture.',
					},
					11705: {
						sortOrder: 3,
						description: 'Topical news reports on philanthropy in education.',
					},
					11706: {
						sortOrder: 4,
						description:
							'Topical news reports on philanthropy covering environmental issues.',
					},
					11707: {
						sortOrder: 5,
						description: 'Topical news reports on best practices in funding.',
					},
					11708: {
						sortOrder: 6,
						description:
							'Topical news reports on philanthropy in health and science.',
					},
					11709: {
						sortOrder: 7,
						description:
							'Topical news reports on philanthropy & social justice.',
					},
					11699: {
						sortOrder: 8,
						description: 'This is the weekly digest of Funding News & Tips.',
					},
					11865: {
						sortOrder: 9,
						description:
							"David Callahan's weekly take on the political environment and philanthropy.",
					},
					11732: {
						sortOrder: 10,
						description:
							"Our partners have great ideas! We hope you'll find it useful.",
					},
				};

				// ✅ Inject metadata (sortOrder + description) into each list item
				const listsWithMetadata = lists.map((list) => ({
					...list,
					sortOrder: metadata[list.Id]?.sortOrder ?? 999, // Unknown = bottom
					description: metadata[list.Id]?.description ?? '', // Fallback to empty string
				}));

				// ✅ Sort by `sortOrder`
				listsWithMetadata.sort((a, b) => a.sortOrder - b.sortOrder);

				setMailingLists(listsWithMetadata);

				// ✅ Initialize toggle state
				const initialSelection = listsWithMetadata.reduce((acc, list) => {
					acc[list.Id] = false; // Start unchecked
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
							key={list.Id} // ✅ Piano's `Id` is the stable unique key
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
								checked={selectedLists[list.Id]} // ✅ Use `Id` for toggle state
								onChange={() => toggleList(list.Id)} // ✅ Use `Id` for toggle handler
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
