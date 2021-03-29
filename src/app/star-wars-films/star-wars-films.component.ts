import *  as StarWarsFilmsActions from './store/star-wars-films.actions';
import { BaseComponent } from '../shared/components/base.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import { map } from 'rxjs/operators';
import { StarWarsFilm } from './star-wars-film';
import { Observable } from 'rxjs';
import * as cgTableModels from './../shared/components/cg-table/models/cg-table-models';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-star-wars-films',
  templateUrl: './star-wars-films.component.html',
  styleUrls: ['./star-wars-films.component.scss']
})
export class StarWarsFilmsComponent extends BaseComponent implements OnInit, OnDestroy {
  filmsColumns: cgTableModels.cgTableColumn[] = [
    { columnTitle: 'ID', columnName: 'uid', align: 'center' },
    { columnTitle: 'Title', columnName: 'properties.title', align: 'left' },
    { columnTitle: 'Episode No', columnName: 'properties.episode_id', align: 'center' },
    { columnTitle: 'Release Date', columnName: 'properties.release_date', align: 'center' }
  ];

  films: StarWarsFilm[];
  errorMessage: string;
  loading: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.store.select('starWarsFilms'), (state) => {
      this.films = state.films;
      this.errorMessage = state.errorMessage;
      this.loading = state.loading;
    });

    this.store.dispatch(new StarWarsFilmsActions.FetchFilms());
  }

  reorderColumns(event: [number, number]) {
    const orderedColumns = [...this.filmsColumns];
    moveItemInArray(orderedColumns, event[0], event[1]);
    this.filmsColumns = orderedColumns;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
