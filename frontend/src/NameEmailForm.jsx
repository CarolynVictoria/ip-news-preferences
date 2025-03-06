function NameEmailForm({
	email,
	setEmail,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	isKnownSubscriber,
}) {
	const inputClass =
		'border p-2 w-full rounded-md bg-white text-black border-gray-300';

	return (
		<div className='mb-6'>
			{isKnownSubscriber ? (
				<div>
					<label className='block text-gray-700'>Email Address</label>
					<input
						type='email'
						value={email}
						readOnly
						className={`${inputClass} bg-gray-100`}
					/>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<input
						type='text'
						placeholder='First Name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className={inputClass}
					/>
					<input
						type='text'
						placeholder='Last Name'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className={inputClass}
					/>
					<input
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={`${inputClass} col-span-2`}
					/>
				</div>
			)}
		</div>
	);
}

export default NameEmailForm;
