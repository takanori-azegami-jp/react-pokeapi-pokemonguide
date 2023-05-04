import { useEffect, useState } from 'react';
import './App.css';
import { getallPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card';


function App() {
	const initialURL = "https://pokeapi.co/api/v2/pokemon/";
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState([]);

	useEffect(() => {
		const fetchPokemonData = async() => {
			//全てのポケモンデータを取得
			let res = await getallPokemon(initialURL);
			loadPokemon(res.results);
			// console.log(res.results);
			setLoading(false);
		};
		fetchPokemonData();
	}, []);

	const loadPokemon = async (data) =>{
		let _pokemonData = await Promise.all(
			data.map((pokemon) => {
				// console.log(pokemon);
				let pokemonRecord = getPokemon(pokemon.url);
				return pokemonRecord;
			})
		);
		setPokemonData(_pokemonData);
	};

	console.log(pokemonData);


  return (
		<div className="App">
			{ loading ? (
				<h1>ロード中・・・</h1>
			) : (
				<>
					<div className="pokemonCardContainer">
						{ pokemonData.map((pokemon,i) => {
							return <Card key={i} pokemon={pokemon}/>;
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
