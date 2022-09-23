import React, { useState, useEffect } from "react";
import "./Home.css";
import { api } from "../../api";

export const Home = () => {
  const [comics, setComics] = useState([]);

  const fetchData = async () => {
    const data = await api.allComics();
    setComics(data);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const [filter, setFilter] = useState("");

  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="container">
      <Header />
      <ComicList comics={filteredComics} filter={filter} onFilter={setFilter} />
      <Footer itemsCount={filteredComics.length} />
    </main>
  );
};

export const Header = () => {
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

export const ComicList = ({ filter, onFilter, comics }) => {
  const colors = ["#92c952", "#771796", "#24f355", "#d32776", "#f66b97"];
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue((v) => {
      return v === 4 ? 0 : v + 1;
    });
  }, [filter]);

  return (
    <section>
      <p className="inputLabel">Escribe un personaje en la lista</p>
      <div className="inputContainer">
        <input
          className="filterInput"
          onInput={(e) => onFilter(e.target.value)}
          value={filter}
        />
        <button className="clearButton" onClick={() => onFilter("")}>
          Limpiar búsqueda
        </button>
      </div>
      {comics.map((comic) => (
        <div
          key={comic.id}
          className="comicCard"
          style={{ backgroundColor: colors[value] }}
        >
          <p className="comicTitle">{comic.title}</p>
          <p>{comic.characters.join(", ")}</p>
        </div>
      ))}
    </section>
  );
};

export const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  );
};
