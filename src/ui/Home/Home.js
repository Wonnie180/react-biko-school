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

export const Listado = ({ filtro }) => {

  return (
    <section>
      {comics.filter(o => o.title.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())).map((comic) => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">{comic.title}</p>
          <p>{comic.characters.join(", ")}</p>
        </div>
      ))}
    </section>
  );
};

export const Footer = () => {
  return (
    <footer>
      <p>Footer</p>
    </footer>
  );
};

export const Home = () => {
  const [text, setText] = useState("");
  return (
    <main className="container">
      <Header />
      <p className="inputLabel">Escribe un personaje en la lista</p>
      <SearchBox text={text} setText={setText} placeholder="Escribe el titulo" />
      <Listado filtro={text} />
      <Footer />
    </main>
  );
};
