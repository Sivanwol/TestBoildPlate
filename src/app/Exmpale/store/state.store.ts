import { Injectable } from '@angular/core';
import { Store, StoreConfig, arrayAdd } from '@datorama/akita';
import { StateData } from 'src/app/Common/state';

export interface StateState {
  stateData: Array<{name: string, desciprtion: string}>;
}

export function createInitialState(): StateState {
  return {
    stateData: []
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
        stateData: arrayAdd(state.stateData , data)
      });
    });
  }
}

