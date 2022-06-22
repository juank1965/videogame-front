import React from "react";
import style from "./CardGame.module.css";
import imagen from "../../assets/images/placeholder.jpg";
import { Link } from "react-router-dom";

function CardGame({ game }) {
  return (
    <div className={style.margen}>
      <Link to={`/${game.id}`} className={style.link}>
        <div className={style.card}>
          <img
            className={style.imagen}
            src={game.background_image ? game.background_image : imagen}
            alt="Videogame image"
          />
          <h2>{game.name}</h2>
          <div className={style.datos}>
            <div>
              <h4>Genero(s):</h4>
              <div className={style.generos}>
                {game.genres &&
                  game.genres.map((genre) => {
                    return <p key={genre.id}>{genre.name}</p>;
                  })}
              </div>
            </div>
            <div>
              <h4>Rating:</h4>
              <p>{game.rating}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardGame;
