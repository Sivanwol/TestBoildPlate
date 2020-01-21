import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateStore } from '../store/state.store';
import { arrayUpdate, arrayAdd, arrayRemove, arrayUpsert } from '@datorama/akita';
import { StateData } from 'src/app/Common/state';
import { StateQuery } from '../queries';


@Injectable({ providedIn: 'root' })
export class StateService {

  constructor(private stateStore: StateStore,
              private stateQuery: StateQuery,
              private http: HttpClient) {
  }

  public GetAll() {
    return this.stateQuery.selectStatesData$;
  }

  public Add(data: StateData) {
    delete data.existed;
    delete data.valid;
    this.stateStore.add(data);
  }

}
