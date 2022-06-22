import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./GameDetail.module.css";
import imagen from "../../assets/images/placeholder.jpg";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://videogame-api-production.up.railway.app/api/videogame/${id}`
      )
      .then((res) => {
        setGame(res.data);
      });
    return () => {
      setGame({});
    };
  }, [id]);
  useEffect(() => {
    setGeneros(game.genres);
    setPlataformas(game.platforms);
  }, [game]);

  return (
    <div className={style.container}>
      {game ? (
        <div className={style.card}>
          <h1 className={style.h1}>{game.name}</h1>
          <h4 className={style.h4}>Genres</h4>
          <div className={style.info}>
            {generos ? (
              generos.map((genero) => {
                return (
                  <p className={style.p} key={genero.id}>
                    {genero.name}
                  </p>
                );
              })
            ) : (
              <p className={style.p}>Does not register genres</p>
            )}
          </div>
          <div className={style.detalle}>
            <div>
              <img
                src={game.background_image ? game.background_image : imagen}
                height="auto"
                width="100%"
                alt="Imagen del Game"
              />
            </div>
            <div className={style.descripcion}>
              <h4 className={style.h4}>Description</h4>
              <p className={style.texto}>{game.description}</p>
            </div>
          </div>
          <div className={style.pie}>
            <div className={style.infopie}>
              <div>
                <p>Released</p>
                <p>{game.released}</p>
              </div>
              <div>
                <p>Rating</p>
                <p>{game.rating}</p>
              </div>
            </div>
            <div>
              <p>Platforms</p>
              <div className={style.info}>
                {plataformas ? (
                  plataformas.map((p) => {
                    return (
                      <p className={style.p} key={p.platform.id}>
                        {p.platform.name}
                      </p>
                    );
                  })
                ) : (
                  <p className={style.p}>Does not register platforms</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GameDetail;
