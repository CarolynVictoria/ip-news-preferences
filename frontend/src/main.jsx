import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserSessionProvider } from './UserSessionProvider.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<UserSessionProvider>
			<App />
		</UserSessionProvider>
	</StrictMode>
);
