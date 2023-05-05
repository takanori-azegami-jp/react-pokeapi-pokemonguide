import { useEffect, useState } from 'react';
import './App.css';
import { getallPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
	const initialURL = "https://pokeapi.co/api/v2/pokemon/";
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState([]);
	const [nextURL, setNextURL] = useState("");
	const [prevURL, setPrevURL] = useState("");

	useEffect(() => {
		const fetchPokemonData = async() => {
			//全てのポケモンデータを取得
			let res = await getallPokemon(initialURL);
			await loadPokemon(res.results);
			// console.log(res.next);
			// console.log(res.previous);
			setNextURL(res.next);
			setPrevURL(res.previous); //null
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

	// console.log(pokemonData);

	const handleNextPage = async () => {
		setLoading(true);
		let data = await getallPokemon(nextURL);
		// console.log(data);
		await loadPokemon(data.results);
		setNextURL(data.next);
		setPrevURL(data.previous);
		setLoading(false);
	}

	const handlePrevPage = async () => {
		if(!prevURL) return; // nullなら何もしない

		setLoading(true);
		let data = await getallPokemon(prevURL);
		// console.log(data);
		await loadPokemon(data.results);
		setPrevURL(data.next);
		setPrevURL(data.previous);
		setLoading(false);
	}


  return (
		<>
			<Navbar />
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
						<div className="btn">
							<button onClick={handlePrevPage}>前へ</button>
							<button onClick={handleNextPage}>次へ</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
