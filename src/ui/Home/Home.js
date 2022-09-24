import React, { useState, useEffect } from "react";
import { api } from "../../api";
import "./Home.css";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [character_1, setCharacter_1] = useState("");
  const [character_2, setCharacter_2] = useState("");
  const [comics, setComics] = useState([]);

  const fetchComicsById = async (character_1, character_2) => {
    if (character_1 === "" || character_2 === "") {
      return;
    }

    const comics_1 = await api.comics(character_1);
    const comics_2 = await api.comics(character_2);
    setComics(
      comics_1.filter((comic1) =>
        comics_2.some((comic2) => comic1.id === comic2.id)
      )
    );
  };

  const fetchCharacters = async () => {
    const data = await api.characters();
    setCharacters(data);
  };

  useEffect(() => {
    fetchCharacters().catch(console.error);
  }, []);

  useEffect(() => {
    setComics([]);
    fetchComicsById(character_1, character_2).catch(console.error);
  }, [character_1, character_2]);

  return (
    <main className="container">
      <Header />
      <ComicList
        comics={comics}
        characters={characters}
        character_1={character_1}
        setCharacter_1={setCharacter_1}
        character_2={character_2}
        setCharacter_2={setCharacter_2}
      />
      <Footer itemsCount={comics.length} />
    </main>
  );
};

const Header = () => {
  return (
    <header>
      <h1 className="title">Buscador de cómics de Marvel</h1>
      <h2 className="subtitle">
        Este buscador encontrará los cómics en los que aparezcan los dos
        personajes que selecciones en el formulario
      </h2>
    </header>
  );
};

const ComicList = ({
  comics,
  characters,
  character_1,
  character_2,
  setCharacter_1,
  setCharacter_2,
}) => {
  const selectOptions = characters.map((character) => ({
    value: character.id,
    label: character.name,
  }));
  return (
    <section>
      <p className="inputLabel">Selecciona una pareja de personajes</p>
      <div className="inputContainer">
        <Select
          character={character_1}
          options={selectOptions}
          setCharacter={setCharacter_1}
        />
        <Select
          character={character_2}
          options={selectOptions}
          setCharacter={setCharacter_2}
        />
        <button
          onClick={() => {
            setCharacter_1("");
            setCharacter_2("");
          }}
          className="clearButton"
        >
          Limpiar búsqueda
        </button>
      </div>
      {comics.map((comic) => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">{comic.title}</p>
          <p>{comic.characters.join(", ")}</p>
        </div>
      ))}
    </section>
  );
};

const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  );
};

const Select = ({ options, setCharacter, character }) => {
  return (
    <select
      value={character}
      onChange={(e) => setCharacter(e.target.value)}
      className="characterSelector"
    >
      <option key="" value="" />
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
