import React, { useState } from "react";
import CardGame from "../cardGame/CardGame";
import style from "./ContainerGames.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoGames, getGenres } from "../../redux/actions";

const ContainerGames = () => {
  let videogames = useSelector((state) => state.videogamesFiltrados);
  const dispatch = useDispatch();
  const [pActual, setPActual] = useState(1);
  const videoGamesPerPage = 15;
  const pfinal = Math.ceil(videogames.length / videoGamesPerPage);
  const paginas = [];
  for (let i = 1; i <= pfinal; i++) {
    paginas.push(i);
  }
  useEffect(() => {
    dispatch(getAllVideoGames());
    dispatch(getGenres());
  }, []);

  const [elements, setElements] = useState([]);

  useEffect(() => {
    const gamesPerPage = () => {
      const elSelected = videogames.slice(0, videoGamesPerPage);
      setElements(elSelected);
      setPActual(1);
    };
    gamesPerPage();
  }, [videogames]);

  const handlerChangePrevPage = () => {
    const prePage = pActual - 1;
    const prePePage = pActual - 2;
    if (prePePage <= -1) return;
    const firstIndex = prePePage * videoGamesPerPage;
    const lastIndex = prePage * videoGamesPerPage;
    setElements(videogames.slice(firstIndex, lastIndex));
    setPActual(prePage);
  };

  const handlerChangeNextPage = () => {
    const totalItems = videogames.length;
    if (pActual === pfinal) return;
    const nextPage = pActual + 1;
    const firstIndex = pActual * videoGamesPerPage;
    const lastIndex = nextPage * videoGamesPerPage;
    if (firstIndex > totalItems) return;
    setElements(videogames.slice(firstIndex, lastIndex));
    setPActual(nextPage);
  };

  const handlerChangePage = (e) => {
    const page = e.target.value;
    if (page >= pfinal || page < 1) return;
    const firstIndex = (page - 1) * videoGamesPerPage;
    const lastIndex = page * videoGamesPerPage;
    setElements(videogames.slice(firstIndex, lastIndex));
    setPActual(page);
  };

  return (
    <div>
      <div className={style.pie}>
        <div className={style.paginado}>
          {pActual !== 1 ? (
            <button className={style.boton} onClick={handlerChangePrevPage}>
              Prev
            </button>
          ) : (
            <button className={style.boton1} disabled>
              Prev
            </button>
          )}
          <div>
            {paginas.map((p) => (
              <button
                key={p}
                value={p}
                className={p === pActual ? style.seleccion : style.noseleccion}
                onClick={handlerChangePage}
                disabled
              >
                {p}
              </button>
            ))}
          </div>
          {pActual !== pfinal ? (
            <button className={style.boton} onClick={handlerChangeNextPage}>
              Next
            </button>
          ) : (
            <button className={style.boton1} disabled>
              Next
            </button>
          )}
        </div>
      </div>
      <div className={style.container}>
        {elements &&
          elements.map((el) => {
            return <CardGame key={el.id} game={el} />;
          })}
      </div>
      <div className={style.pie}>
        <div className={style.paginado}>
          {pActual !== 1 ? (
            <button className={style.boton} onClick={handlerChangePrevPage}>
              Prev
            </button>
          ) : (
            <button className={style.boton1} disabled>
              Prev
            </button>
          )}
          <div>
            {paginas.map((p) => (
              <button
                key={p}
                value={p}
                className={pActual === p ? style.seleccion : style.noseleccion}
                onClick={handlerChangePage}
              >
                {p}
              </button>
            ))}
          </div>
          {pActual !== pfinal ? (
            <button className={style.boton} onClick={handlerChangeNextPage}>
              Next
            </button>
          ) : (
            <button className={style.boton1} disabled>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerGames;
