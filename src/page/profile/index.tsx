import * as React from "react";
import {requestUrl, request}  from '../../request';
import {getAppStore, setHeader, IMState} from '../../redux';
import {BaseWidget, AllWidgetProps} from '../../HE-ui'
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
    setTimeout(() => {
      const exhibitionDesc = localStorage.getItem('exhibitionDesc') as  string;
      getAppStore().dispatch(setHeader(true, exhibitionDesc))
    })
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
