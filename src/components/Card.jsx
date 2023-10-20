import {Link} from 'react-router-dom';
import styles from './Card.module.css';

function Card({charactersToDisplay}) {
	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
				{charactersToDisplay?.map((character) => (
					<Link to={`/character/${character.id}`} key={character.id}>
						<div
							className={`block max-w-[15rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ${styles.card}`}
						>
							<div className="relative overflow-hidden bg-cover bg-no-repeat">
								<img
									className="rounded-t-lg"
									src={character.image}
									alt={character.name}
								/>
							</div>
							<div className="p-6">
								<h2>{character.name}</h2>
								<p className="text-base text-neutral-600 dark:text-neutral-200">
									Status: {character.status}
								</p>
								<p className="text-base text-neutral-600 dark:text-neutral-200">
									Species: {character.species}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Card;
