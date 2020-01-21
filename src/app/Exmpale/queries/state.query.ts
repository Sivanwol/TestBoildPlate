import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { StateStore, StateState } from '../store/state.store';

@Injectable({ providedIn: 'root' })
export class StateQuery extends Query<StateState> {

  constructor(protected store: StateStore) {
    super(store);
  }

}
