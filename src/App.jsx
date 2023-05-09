import { useEffect, useState } from 'react';
import './App.css';
import { getallPokemon, getPokemon, getPokemonJson } from './utils/pokemon.jsx';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import styled from 'styled-components';

// Appメイン
function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon/';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');
  const pokemonJsonURL =
    'https://gist.githubusercontent.com/takanori-azegami-jp/ba58fa91142639b6046704ef4fb52a83/raw/0ea137397f9701828ecd7da7d253168678646488/pokemon.json';
  const [pokemonJson, setPokemonJson] = useState([]);

  // レスポンシブ
  const PokemonCardCon = styled.div`
    // 798pxより大きい場合
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    gap: 20px;
    margin-top: 20px;
    // 798pxより小さい場合
    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: none;
      width: 100%;
      place-items: center;
    }
  `;

  // レンダリング時の処理
  useEffect(() => {
    const fetchPokemonData = async () => {
      // ポケモン日本語名データを取得
      let pokemonJson = await getPokemonJson(pokemonJsonURL);
      setPokemonJson(pokemonJson);

      //全てのポケモンデータを取得
      let res = await getallPokemon(initialURL);
      await loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous); //null
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  // pokemonデータ読み込み
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // 次のページを読み込み
  const handleNextPage = async () => {
    if (!nextURL) return; // nullなら何もしない

    setLoading(true);
    let data = await getallPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  // 前のページを読み込み
  const handlePrevPage = async () => {
    if (!prevURL) return; // nullなら何もしない

    setLoading(true);
    let data = await getallPokemon(prevURL);
    await loadPokemon(data.results);
    setPrevURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  // 表示内容
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div>
              <PokemonCardCon>
                {pokemonData.map((pokemon, i) => {
                  return (
                    <Card key={i} pokemon={pokemon} pokemonJson={pokemonJson} />
                  );
                })}
              </PokemonCardCon>
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
