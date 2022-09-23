import React from "react";
import "./Home.css";
import { useState } from "react";
import { SearchBox } from "../../Components/SearchBox/SearchBox";

const comics = [
  {
    id: 45977,
    title: "Captain America (2012) #11",
    characters: ["Captain America"],
  },
  {
    id: 43722,
    title: "Captain America (2012) #1",
    characters: ["Captain America"],
  },
  {
    id: 40391,
    title: "Captain America (2011) #18",
    characters: ["Captain America"],
  },
  {
    id: 43339,
    title: "Uncanny Avengers (2012) #1",
    characters: [
      "Captain America",
      "Havok",
      "Rogue",
      "Scarlet Witch",
      "Thor",
      "Wolverine",
    ],
  },
];

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

export const Listado = ({ items }) => {
  return (
    <section>
      {items.map((comic) => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">{comic.title}</p>
          <p>{comic.characters.join(", ")}</p>
        </div>
      ))}
    </section>
  );
};

export const Footer = ({ items_filtrados }) => {
  return (
    <footer>
      <p>
        Elementos:
        {items_filtrados.length}
      </p>
    </footer>
  );
};

export const Home = () => {
  const [filtro, setFiltro] = useState("");

  const reg_exp = RegExp("^.*" + filtro + ".*$", "gi");

  const comics_filtrados = comics.filter((comic) => comic.title.match(reg_exp));

  return (
    <main className="container">
      <Header />
      <p className="inputLabel">Escribe un personaje en la lista</p>
      <SearchBox
        text={filtro}
        setText={setFiltro}
        placeholder="Escribe el titulo"
      />
      <Listado items={comics_filtrados} />
      <Footer items_filtrados={comics_filtrados} />
    </main>
  );
};
