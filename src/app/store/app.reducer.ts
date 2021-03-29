import { ActionReducerMap } from '@ngrx/store';

import * as fromStarWarsFilms from '../star-wars-films/store/star-wars-films.reducer';

export interface AppState {
  starWarsFilms: fromStarWarsFilms.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    starWarsFilms: fromStarWarsFilms.starWarsFilmsReducer,
};
