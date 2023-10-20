import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import styles from './CharacterDetail.module.css';

function CharacterDetail() {
	const {id} = useParams();
	const characterId = parseInt(id, 10);
	const [character, setCharacter] = useState(null);
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		const fetchCharacter = async () => {
			try {
				const response = await fetch(
					`https://rickandmortyapi.com/api/character/${id}`
				);
				const data = await response.json();
				setCharacter(data);

				const episodeDataArray = await Promise.all(
					data.episode.map((episodeUrl) =>
						fetch(episodeUrl).then((response) => response.json())
					)
				);
				setEpisodes(episodeDataArray);
			} catch (error) {
				console.error('Error fetching character data:', error);
			}
		};

		fetchCharacter();
	}, [id]);

	if (!character) {
		return <div className="text-center mt-4">Cargando...</div>;
	}

	const filteredEpisodes = [
		...new Map(episodes.map((episode) => [episode.id, episode])).values(),
	];

	return (
		<div className="py-5 bg-slate-400 h-screen w-screen flex justify-evenly items-center flex-col md:flex-row">
			<div className="mb-4 md:mb-0 text-center md:text-left">
				<img
					src={character.image}
					alt={character.name}
					className="w-64 h-64 mx-auto md:mx-0 rounded-full mb-4"
				/>
				<h1
					className={`text-4xl font-bold mb-4 text-center md:text-left ${styles.animateMove}`}
				>
					{character.name}
				</h1>

				<div className="flex justify-center space-x-4">
					{characterId > 1 && (
						<Link
							to={`/character/${characterId - 1}`}
							className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
						>
							Anterior
						</Link>
					)}
					<Link
						to={`/character/${characterId + 1}`}
						className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
					>
						Siguiente
					</Link>
				</div>
				<div className="flex justify-center">
					<Link
						to="/"
						className="block mt-4 text-gray-600  hover:underline border border-gray-600 rounded-full p-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
							/>
						</svg>
					</Link>
				</div>
			</div>
			<div className="w-full md:w-2/3 md:text-center">
				<div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-lg dark:bg-neutral-700">
					<p className={`text-xl ${styles.animateMove}`}>
						Status:{' '}
						<span className="font-bold text-neutral-600 dark:text-neutral-200">
							{character.status}
						</span>
					</p>
					<p className={`text-xl ${styles.animateMove}`}>
						Species:{' '}
						<span className="font-bold text-neutral-600 dark:text-neutral-200">
							{character.species}
						</span>
					</p>
					{character.type && (
						<p className={`text-xl ${styles.animateMove}`}>
							Type:{' '}
							<span className="font-bold text-neutral-600 dark:text-neutral-200">
								{character.type}
							</span>
						</p>
					)}
					<p className={`text-xl ${styles.animateMove}`}>
						Gender:{' '}
						<span className="font-bold text-neutral-600 dark:text-neutral-200">
							{character.gender}
						</span>
					</p>
					<p className={`text-xl ${styles.animateMove}`}>
						Origin:
						{character.origin?.url && (
							<span className="font-bold text-neutral-600 dark:text-neutral-200">
								{' '}
								{character.origin.name}{' '}
							</span>
						)}
					</p>
				</div>

				<div className="mt-8">
					<h2 className="text-2xl font-bold mb-4">Episodes:</h2>
					<div style={{overflowX: 'auto', maxHeight: '350px'}}>
						<table className="min-w-full table-auto bg-neutral-600 dark:bg-neutral-600">
							<thead>
								<tr>
									<th className="border px-4 py-2 text-neutral-600 dark:text-neutral-200">
										Episode
									</th>
									<th className="border px-4 py-2 text-neutral-600 dark:text-neutral-200">
										Name
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredEpisodes.map((episode) => (
									<tr key={episode.id}>
										<td className="border px-4 py-2 text-white">
											{episode.id}
										</td>
										<td className="border px-4 py-2  text-white ">
											<p>{episode.name}</p>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CharacterDetail;
