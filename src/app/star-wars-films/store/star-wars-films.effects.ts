import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StarWarsFilmsActions from './star-wars-films.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { StarWarsFilm } from '../star-wars-film';
import { Response } from './../response';
import { of } from "rxjs";


const handleError = (errorResp: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResp.message) {
        return of(new StarWarsFilmsActions.FetchFilmsFail(errorMessage));
    }
    switch (errorResp.message) {
        case 'not found':
            errorMessage = 'Data not available!';
            break;
    }
    return of(new StarWarsFilmsActions.FetchFilmsFail(errorResp.message));
};

@Injectable()
export class StarWarsFilmsEffects {
    fetchFilms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StarWarsFilmsActions.FETCH_FILMS),
            switchMap(() => {
                return this.http.get<Response<StarWarsFilm[]>>(
                    'https://www.swapi.tech/api/films'
                ).pipe(
                    map((resp: Response<StarWarsFilm[]>) => {
                        return new StarWarsFilmsActions.FetchFilmsSuccess(resp.result);
                    }),
                    catchError(errorResp => {
                        return handleError(errorResp);
                    })
                );
            }));
    });


    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}