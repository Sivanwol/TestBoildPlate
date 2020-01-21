import { Injectable } from '@angular/core';
import { Store, StoreConfig, arrayAdd, arrayUpdate } from '@datorama/akita';
import { StateData } from 'src/app/Common/state';

export interface StateState {
  list: Array<StateData>;
}

export function createInitialState(): StateState {
  return {
    list: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stateData' })
export class StateStore extends Store<StateState> {

  constructor() {
    super(createInitialState());
  }

  add(data: StateData) {
    this.update((state: StateState) => {
      return ({
        list: arrayAdd(state.list , data)
      });
    });
  }
  edit(stateName, data: StateData) {
    this.update((state: StateState) => {
      return ({
        list: arrayUpdate(state.list , (item => item.name === stateName), data)
      });
    });
  }
}

