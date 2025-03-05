function Toggle({ label, checked, onChange }) {
	return (
		<div className='flex items-center space-x-3'>
			<span className='text-sm'>{label}</span>
			<label className='relative inline-flex items-center cursor-pointer'>
				<input
					type='checkbox'
					className='sr-only peer'
					checked={checked}
					onChange={onChange}
				/>
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-active"></div>
			</label>
		</div>
	);
}

export default Toggle;
