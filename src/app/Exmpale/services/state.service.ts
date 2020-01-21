import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateStore } from '../store/state.store';
import { arrayUpdate, arrayAdd, arrayRemove, arrayUpsert } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class StateService {

  constructor(private stateStore: StateStore,
              private http: HttpClient) {
  }

  update() {
    //this.stateStore.update(id, state);
  }

}
