import { createStore, Store } from "redux";
import {IMState, reducer} from './reducer';

let store: Store<IMState>;
export function createAppStore(): Store<IMState>{
  if(store){
    return store;
  }

  store = createStore(
    reducer as any
  );

  window._appStore = store;
  return store;
}

export function getAppStore(): Store<IMState>{
  return store;
}