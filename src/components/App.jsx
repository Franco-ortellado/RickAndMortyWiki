import {Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

function App() {
	const [characters, setCharacters] = useState([]);

	let numeros = [];
	for (let i = 1; i <= 826; i++) {
		numeros.push(i);
	}

	useEffect(() => {
		fetch(`https://rickandmortyapi.com/api/character/${numeros.join(',')}`)
			.then((response) => response.json())
			.then((data) => setCharacters(data));
	}, []);

	return (
		<div>
			<Routes>
				<Route
					exact
					path="/"
					element={<CharacterList characters={characters} />}
				/>
				<Route path="/character/:id" element={<CharacterDetail />} />
			</Routes>
		</div>
	);
}

export default App;
