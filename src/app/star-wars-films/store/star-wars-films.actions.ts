import { Action } from '@ngrx/store';
import { StarWarsFilm } from '../star-wars-film';

export const FETCH_FILMS_SUCCESS = '[StarWarsFilms] Fetch Films Success';
export const FETCH_FILMS_FAIL = '[StarWarsFilms] Fetch Films Fail';
export const FETCH_FILMS = '[StarWarsFilms] Fetch Films';

export class FetchFilmsSuccess implements Action {
    readonly type = FETCH_FILMS_SUCCESS;

    constructor(public payload: StarWarsFilm[]) { }
}

export class FetchFilmsFail implements Action {
    readonly type = FETCH_FILMS_FAIL;

    constructor(public payload: string) { }
}

export class FetchFilms implements Action {
    readonly type = FETCH_FILMS;
}

export type StarWarsFilmsActions = FetchFilmsSuccess | FetchFilmsFail | FetchFilms;