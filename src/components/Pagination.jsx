const Pagination = ({totalPages, currentPage, handlePageChange}) => {
	const maxPagesToShow = 10;
	const pageRangeStart =
		currentPage <= maxPagesToShow
			? 1
			: currentPage - Math.floor(maxPagesToShow / 2); // Asegura que no haya menos de maxPagesToShow páginas antes de la página actual

	const pageRangeEnd =
		pageRangeStart + maxPagesToShow <= totalPages
			? pageRangeStart + maxPagesToShow
			: totalPages; // Asegura que no haya más de maxPagesToShow páginas después de la página actual

	const pageNumbers = Array.from(
		{length: pageRangeEnd - pageRangeStart + 1},
		(_, i) => pageRangeStart + i
	);

	return (
		<ul className="flex flex-wrap justify-center items-center mb-4">
			<li className="hidden sm:block">
				<button
					onClick={() => handlePageChange(1)}
					className="text-green-400 hover:underline"
				>
					&lt;&lt;
				</button>
			</li>
			{pageNumbers.map((pageNumber) => (
				<li key={pageNumber}>
					<button
						onClick={() => handlePageChange(pageNumber)}
						className={`${
							pageNumber === currentPage
								? 'bg-green-500 text-white'
								: 'text-green-100 hover:underline'
						} px-4 py-2 rounded-full hover:bg-green-400 transition-all`}
					>
						{pageNumber}
					</button>
				</li>
			))}
			<li className="hidden sm:block">
				<button
					onClick={() => handlePageChange(totalPages)}
					className="text-green-500 hover:underline"
				>
					&gt;&gt;
				</button>
			</li>
		</ul>
	);
};

export default Pagination;
