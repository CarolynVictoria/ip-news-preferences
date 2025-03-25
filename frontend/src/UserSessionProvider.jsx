// /frontend/src/UserSessionProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserSessionContext = createContext();

function useUserSession() {
	return useContext(UserSessionContext);
}

function UserSessionProvider({ children }) {
	const [userSession, setUserSession] = useState(null);

	useEffect(() => {
		if (!window.tp) {
			window.tp = [];
		}

		window.tp.push(['setUsePianoIdUserProvider', true]);

		window.tp.push([
			'init',
			() => {
				window.tp.pianoId.init();

				if (window.tp.pianoId.isUserValid()) {
					const user = window.tp.pianoId.getUser();
					setUserSession(user);
				}
			},
		]);
	}, []);

	return (
		<UserSessionContext.Provider value={{ userSession }}>
			{children}
		</UserSessionContext.Provider>
	);
}

export { useUserSession, UserSessionProvider };