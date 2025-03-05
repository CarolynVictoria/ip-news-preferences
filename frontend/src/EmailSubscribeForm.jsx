import { useState } from 'react';

function EmailSubscribeForm() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async () => {
		try {
			const response = await fetch('/api/subscriber/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, mailingListIds: [11865] }), // Replace with actual list IDs if needed
			});

			if (!response.ok) throw new Error('Failed to subscribe');

			const result = await response.json();
			setMessage(result.message);
		} catch (error) {
			setMessage('Error subscribing. Please try again.');
			console.error('Subscription error:', error);
		}
	};

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-semibold mb-2'>Subscribe to Newsletters</h2>
			<input
				type='email'
				placeholder='Email Address'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='border border-gray-300 p-2 w-full rounded-md mb-4'
			/>
			<button
				className='bg-brand hover:bg-brand/90 text-white font-medium py-2 px-6 rounded-md'
				onClick={handleSubmit}
			>
				Subscribe
			</button>
			{message && <p className='mt-4 text-green-600'>{message}</p>}
		</div>
	);
}

export default EmailSubscribeForm;
