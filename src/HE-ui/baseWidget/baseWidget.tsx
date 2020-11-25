import * as React from "react";
import {IMState} from '../../redux/reducer';
import Cookies from 'js-cookie';

export type AllWidgetProps<T> = {
  dispatch?: any;
  appI18nMessages?: any;
};
// export default class BaseWidget<P = {}, S = {}> extends React.PureComponent<P, S>{
  export class BaseWidget<P extends AllWidgetProps<{}> = AllWidgetProps<{}>, S = {}> extends React.PureComponent<P, S>{
  /**
   * By default, the props in "WidgetInjectedProps" will be injected into widget props. To map more props, please use this function.
   */
  static mapExtraStateProps: (state: IMState, ownProps: Partial<any>) => any;

  checkIsLogin = (): boolean => {
    const userName = Cookies.get('userName') || '';
    return !!userName;
  }

  messages: any = JSON.parse(localStorage.getItem('messages') || '{}');
}