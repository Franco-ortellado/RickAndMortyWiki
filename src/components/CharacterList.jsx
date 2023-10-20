import {useState} from 'react';
import Pagination from './Pagination';
import Card from './Card';

const CharacterList = ({characters}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const charactersPerPage = 8;

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	if (!characters || characters.length === 0) {
		return (
			<div>
				<h1 className="text-2xl font-bold">RickAndMortyWiki</h1>
				<p>No hay personajes disponibles.</p>
			</div>
		);
	}

	// Filtrar personajes basados en el término de búsqueda
	const filteredCharacters = characters.filter((character) => {
		return character.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const startIndex = (currentPage - 1) * charactersPerPage;
	const endIndex = startIndex + charactersPerPage;
	const charactersToDisplay = filteredCharacters.slice(startIndex, endIndex);

	// let totalpages = Math.ceil(characters.length / charactersPerPage);
	const totalpages = Math.ceil(filteredCharacters.length / charactersPerPage);

	return (
		<div className=" bg-slate-400 text-center py-1">
			<div className="relative flex flex-col md:flex-row md:items-center justify-evenly">
				<h1 className="font-bold">RickAndMortyWiki</h1>
				<div className="flex justify-center space-x-2 my-2 md:my-0">
					<input
						type="text"
						placeholder="Buscar personaje"
						value={searchTerm}
						onChange={handleSearch}
						className="p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						required
					/>
					<button
						type="submit"
						className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
					>
						Buscar
					</button>
				</div>
			</div>

			<hr className="border-t-2 border-gray-300 my-4" />

			<Pagination
				totalPages={totalpages}
				currentPage={currentPage}
				handlePageChange={handlePageChange}
			/>
			<Card charactersToDisplay={charactersToDisplay} />
		</div>
	);
};

export default CharacterList;
