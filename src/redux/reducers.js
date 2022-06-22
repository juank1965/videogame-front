import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAME_BY_NAME,
  SORT_VIDEOGAMES,
  BD_ORIGIN_CHANGE,
  CHANGE_GENRE,
  GET_GENRES,
  CREATE_VIDEOGAME,
} from "./actions";

const initialState = {
  videogamesFiltrados: [],
  videogames: [],
  genres: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        videogamesFiltrados: action.payload,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videogamesFiltrados: action.payload,
      };

    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        videogamesFiltrados: action.payload,
      };
    case SORT_VIDEOGAMES:
      let videogamesOrdenados = [...state.videogames];
      switch (action.payload) {
        case "asc":
          videogamesOrdenados.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;
        case "des":
          videogamesOrdenados.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
          break;
        // ordenar por rating
        case "rating":
          videogamesOrdenados.sort((a, b) => {
            if (a.rating > b.rating) {
              return -1;
            }
            if (a.rating < b.rating) {
              return 1;
            }
            return 0;
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        videogamesFiltrados: videogamesOrdenados,
      };
    case BD_ORIGIN_CHANGE:
      let videoGamesPorOrigen = [...state.videogames];
      if (action.payload === "api") {
        // filtrar por BD api
        videoGamesPorOrigen = videoGamesPorOrigen.filter(
          (videoGame) => typeof videoGame.id === "number"
        );
      }
      if (action.payload === "bd") {
        // filtrar por BD bd
        videoGamesPorOrigen = videoGamesPorOrigen.filter(
          (videoGame) => typeof videoGame.id !== "number"
        );
      }

      if (videoGamesPorOrigen.length === 0) {
        videoGamesPorOrigen = [...state.videogames];
        alert(
          `No hay videojuegos en el origen ${action.payload}. Se muestran todos`
        );
      }
      return {
        ...state,
        videogamesFiltrados: videoGamesPorOrigen,
      };
    case CHANGE_GENRE:
      let videoGamesPorGenero = [...state.videogames];
      videoGamesPorGenero = videoGamesPorGenero.filter(
        (videogame) =>
          videogame.genres &&
          videogame.genres.find((genre) => genre.name === action.payload)
      );

      if (videoGamesPorGenero.length === 0) {
        videoGamesPorGenero = [...state.videogames];
        alert(
          `No hay videojuegos del genero ${action.payload} o ha seleccionado ALL, se muestran todos`
        );
      }
      return {
        ...state,
        videogamesFiltrados: videoGamesPorGenero,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames: [...state.videogames, action.payload],
        videogamesFiltrados: [...state.videogames, action.payload],
      };

    default:
      return state;
  }
}

export default reducer;
