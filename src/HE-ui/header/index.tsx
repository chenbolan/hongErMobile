import * as React from "react";
import {requestUrl, request}  from '../../request';
import {getAppStore, toggleSlideBar, IMState} from '../../redux';
import {BaseWidget, AllWidgetProps} from '../baseWidget/baseWidget'
import {connect} from 'react-redux'
require('./header.scss')

interface Props {

}

interface ExtProps {
  title?: string
}
interface State {

}

export class _Header extends BaseWidget<Props & AllWidgetProps<{}> & ExtProps, State> {

  componentDidMount(){}

  goBack = () => {
    window.history.go(-1);
  }

  showMenu = () => {
    getAppStore().dispatch(toggleSlideBar(true))
  }

  render() {
    return <div className="he-header d-flex">
      <div className="left_arrow" onClick={this.goBack}>
        <span></span>
      </div>
      <div className="title">{this.props.title}</div>
      <div className="menu_con" onClick={this.showMenu}></div>
    </div>;
  }
}
function mapExtraStateProps(state: IMState){
  return {
    title: state.title
  }
}
export default connect(mapExtraStateProps)(_Header)