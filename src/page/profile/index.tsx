import * as React from "react";
import {requestUrl, request}  from '../../request';
import {getAppStore, setHeader, IMState} from '../../redux';
import {BaseWidget, AllWidgetProps} from '../../HE-ui'
import {connect} from 'react-redux'
require('./profile.scss')

interface Props {

}

interface ExtProps {
  title?: string
}
interface State {

}

export default class Profile extends BaseWidget<Props & AllWidgetProps<{}> & ExtProps, State> {

  componentDidMount(){
    this.showHeader()
    document.body.scrollTop = 0;
  }

  showHeader = () => {
    getAppStore().dispatch(setHeader(true, '1'))
  }

  goBack = () => {
    window.history.go(-1);
  }

  render() {
    const profile = localStorage.getItem('profile') as string || ''
    return <div className="profile_con" onClick={this.showHeader}>
      <div  dangerouslySetInnerHTML={{__html: profile}}></div>
    </div>;
  }
}
