export enum ActionType {
  login = "LOGIN",
  isShowLogin = "ShowLogin",
  isShowSlideBar = "ShowSlideBar",
  setHeader = "setHeader"
}
export type Actions = LoginAction | ShowLoginAction;

export interface LoginAction {
  type: ActionType,
  loginStatus: number
}

export interface ShowLoginAction {
  type: ActionType,
  isShow: boolean
}

export interface setHeaderAction {
  type: ActionType,
  title: string,
  isShowHeader: boolean
}

export interface ShowSlidebarAction {
  type: ActionType,
  isShowSlideBar: boolean,
}

export interface ShowHeaderAction {
  type: ActionType,
  isShowHeader: boolean
}


export function toggleSlideBar (isShow: boolean): ShowSlidebarAction {
  return {
    type: ActionType.isShowSlideBar,
    isShowSlideBar: isShow,
  }
}

export function setHeader(isShowHeader: boolean, title: string = ''): setHeaderAction {
  return {
    type: ActionType.setHeader,
    title: title,
    isShowHeader: isShowHeader
  }
}
