import React from 'react';
import { useEffect, useState } from 'react';
import './Card.css';

// pokemonカード明細
const Card = ({ pokemon, pokemonJson }) => {
  const [pokemonJa, setPokemonJa] = useState(null);

  // 日本語名をセットする
  useEffect(() => {
    const jaName = pokemonJson.find(
      (_pokemon) => _pokemon.en.toLowerCase() === pokemon.name.toLowerCase()
    )?.ja;
    setPokemonJa(jaName);
  }, [pokemon, pokemonJson]);

  // 日本語名が見つからな場合は英語の名前を返す
  if (!pokemonJa) {
    setPokemonJa(pokemon.name);
  }

  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt=""></img>
      </div>
      <h3 className="cardName">{pokemonJa}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">
            アビリティ：{pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
