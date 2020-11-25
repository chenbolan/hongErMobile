import {Actions, ActionType} from './action';
import { ImmutableObject } from 'seamless-immutable';
var Immutable = require("seamless-immutable")
export interface State {
  loginStatus?: number;
  isShow?: boolean;
  isShowSlideBar?: boolean;
  title?: string;
  isShowHeader?: boolean
}
export type IMState = ImmutableObject<State>
export function reducer(state: IMState, action: Actions | any): IMState{
  if(!state){
   return initState()
  }
  console.log(action)
  switch(action.type){
    case ActionType.login:
      return state.set('loginStatus', action.loginStatus);

    case ActionType.isShowSlideBar:
      return state.set('isShowSlideBar', action.isShowSlideBar);

    case ActionType.setHeader:
      const newState = state.set('title', action.title);
      return newState.set('isShowHeader', action.isShowHeader);

    default:
      return state;
  }
}

function initState(): IMState {
  const INIT_STATE: State = {
    loginStatus: 0,
    isShow: false,
    isShowSlideBar: false,
    title: '',
    isShowHeader: false
  };
  return Immutable(INIT_STATE as any);
}
