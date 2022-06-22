import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./GameCreate.module.css";
import { createVideogame } from "../../redux/actions.js";

function GameCreate() {
  let genero = useSelector((state) => state.genres);
  const videoJuego = useSelector((state) => state.videogames);
  let dispatch = useDispatch();

  const platforms = [
    "Android",
    "GameBoy",
    "Ios",
    "Nintendo Switch",
    "PC",
    "PlayStation",
    "Xbox",
  ];

  const listageneros = [];
  for (let i = 0; i < genero.length; i++) {
    listageneros.push(genero[i].name);
  }

  const [newGame, setNewGame] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  let [checkGenero, setCheckGenero] = useState(
    new Array(listageneros.length).fill(false)
  );

  function changeCheckGenre(indice) {
    const upCheck = checkGenero.map((item, index) =>
      index === indice ? !item : item
    );
    setCheckGenero(upCheck);
    let parcial = [];
    upCheck.map((currentState, index) =>
      currentState === true
        ? (parcial = parcial.concat(listageneros[index]))
        : 0
    );
    setNewGame({ ...newGame, genres: parcial });
  }

  let [checkPlatform, setCheckPlatform] = useState(
    new Array(platforms.length).fill(false)
  );
  function changeCheckPlatform(indice) {
    const upCheck = checkPlatform.map((item, index) =>
      index === indice ? !item : item
    );
    setCheckPlatform(upCheck);
    let parcial = [];
    upCheck.map((currentState, index) =>
      currentState === true ? (parcial = parcial.concat(platforms[index])) : 0
    );
    setNewGame({ ...newGame, platforms: parcial });
  }

  function inputName(e) {
    e.preventDefault();
    let name = e.target.value;
    let nameChanged = name[0].toUpperCase() + name.slice(1);
    setNewGame({
      ...newGame,
      name: nameChanged,
    });
  }

  function inputsChanged(e) {
    e.preventDefault();
    setNewGame({
      ...newGame,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!newGame.name.trim()) {
      return alert("Necesita poner un nombre");
    } else if (
      videoJuego &&
      videoJuego.find(
        (e) => e.name.toLowerCase().trim() === newGame.name.toLowerCase().trim()
      )
    ) {
      return alert(`El nombre ${newGame.name} ya existe`);
    } else if (newGame.description.trim() === "") {
      return alert("Descripción requerida");
    } else if (newGame.image.trim() === "") {
      return alert("Se requiere Link de imagen");
    } else if (newGame.released.trim() === "") {
      return alert("Fecha de lanzamiento requerida");
    } else if (newGame.released < "1951-05-03") {
      return alert("La fecha no puede ser inferior a 03/05/1951");
    } else if (newGame.genres.length === 0) {
      return alert("Seleccione uno o más generos");
    } else if (
      newGame.rating.trim() === "" ||
      newGame.rating < 1 ||
      newGame.rating > 5
    ) {
      return alert("Rating debe estar entre 1 o 5");
    } else if (newGame.platforms.length === 0) {
      return alert("Seleccione uno o más plataformas");
    } else {
      dispatch(createVideogame(newGame));
      alert(
        `New videogame ${newGame.name} has been created. Si desea crear otro juego vaya a Home y vuelva a entrar a este formulario`
      );
      setNewGame({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
    }
    e.target.reset();
  }

  return (
    <div>
      <form id="form" className={style.form} onSubmit={onSubmit}>
        <h1>Create New Game</h1>
        <div className={style.container}>
          <div className={style.body}>
            <div className={style.info}>
              <div className={style.input}>
                <label htmlFor="inputTitle" className={style.titulo}>
                  Game's Name :
                </label>
                <input
                  className={style.input2}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Write the game's title"
                  onChange={inputName}
                />
              </div>
              <div className={style.input}>
                <label htmlFor="desc" className={style.titulo}>
                  Game Description
                </label>
                <textarea
                  className={style.texto}
                  id="desc"
                  name="description"
                  rows="6"
                  placeholder="Write the game's description"
                  onChange={inputsChanged}
                  value={newGame.description}
                />
              </div>
              <div className={style.input}>
                <label htmlFor="image" className={style.titulo}>
                  Game Image
                </label>
                <input
                  className={style.input2}
                  id="image"
                  onChange={inputsChanged}
                  name="image"
                  type="text"
                  placeholder="Write url of the game's image"
                  value={newGame.image}
                />
              </div>
              <div className={style.input}>
                <label htmlFor="released" className={style.titulo}>
                  Launch Date
                </label>
                <input
                  className={style.input2}
                  type="date"
                  id="released"
                  name="released"
                  placeholder="Write the game's launch date"
                  onChange={inputsChanged}
                  value={newGame.released}
                />
              </div>
            </div>
          </div>
          <div className={style.body}>
            <div className={style.info}>
              <div className={style.input}>
                <label htmlFor="rating" className={style.titulo}>
                  Rating:
                </label>
                <input
                  className={style.input2}
                  onChange={inputsChanged}
                  name="rating"
                  type="text"
                  value={newGame.rating}
                  id="rating"
                />
              </div>
              <div className={style.box}>
                <label className={style.titulo}>Genres</label>
                <div className={style.cuadricula}>
                  {listageneros.map((g, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="checkbox"
                          name="genres"
                          onChange={() => changeCheckGenre(index)}
                          value={g}
                        />
                        <label>{g}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={style.box}>
                <label className={style.titulo}>Platforms</label>
                <div className={style.cuadricula}>
                  {platforms.map((p, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="checkbox"
                          name="platforms"
                          onChange={() => changeCheckPlatform(index)}
                          value={p}
                        />
                        <label>{p}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/home">
          <button type="button" className={style.back}>
            Go Home
          </button>
        </Link>
        <button className={style.boton}>Create New Game</button>
      </form>
    </div>
  );
}

export default GameCreate;
