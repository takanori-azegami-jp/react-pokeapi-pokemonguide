// PokemonAPIの取得
export const getallPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

// pokemonデータの取得
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
      });
  });
};

// pokemon日本語JSONデータの取得
export const getPokemonJson = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      });
  });
};
