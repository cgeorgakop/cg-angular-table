import { StarWarsFilm } from "../star-wars-film";
import * as StarWarsFilmsActions from './star-wars-films.actions';

export interface State {
    films: StarWarsFilm[];
    loading: boolean;
    errorMessage: string;
}

const initialState: State = {
    films: [],
    loading: false,
    errorMessage: null
};

export function starWarsFilmsReducer(
    state: State = initialState,
    action: StarWarsFilmsActions.StarWarsFilmsActions
) {
    switch (action.type) {
        case StarWarsFilmsActions.FETCH_FILMS:
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case StarWarsFilmsActions.FETCH_FILMS_SUCCESS:
            return {
                ...state,
                films: [...action.payload],
                errorMessage: null,
                loading: false
            };
        case StarWarsFilmsActions.FETCH_FILMS_FAIL:
            return {
                ...state,
                films: [],
                errorMessage: action.payload,
                loading: false
            };
        default:
            return state;
    }
}