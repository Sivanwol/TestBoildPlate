import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface StateState {
   key: string;
}

export function createInitialState(): StateState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'state' })
export class StateStore extends Store<StateState> {

  constructor() {
    super(createInitialState());
  }

}

