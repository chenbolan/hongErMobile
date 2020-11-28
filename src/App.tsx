import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import './login-reg.scss';
import {SlideBar, BaseWidget, AllWidgetProps, LanuageType, Messages, HongErHeader} from './HE-ui';
import {HomePage, Detail, ProductDetail, Login, Register, Profile} from './page';
import en_US from './translation/en_US';
import zh_CN from './translation/zh_CN';
import ja_JP from './translation/ja_JP';
import ru_RU from './translation/ru_RU';
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import { IMState, getAppStore, setHeader } from './redux';
const messages: Messages = {
  "en_US": en_US,
  "zh_CN": zh_CN,
  "ja_JP": ja_JP,
  "ru_RU": ru_RU,
}

interface State {
  locale: string;
}

interface ExtProps{
  isShowSlideBar?: boolean;
  isShowHeader?: boolean
}
export class _App extends BaseWidget<AllWidgetProps<{}> & ExtProps, State>{


  constructor(props: any){
    super(props);

    this.state = {
      locale: this.getLocaleLaunguage(),
    }
  }

  componentDidUpdate(preProps: any){
    console.log(preProps)
  }

  componentDidMount(){
    const _this =this;
    const locale: any = Cookies.get('lang') || this.getLocaleLaunguage();
    Cookies.set('lang', locale)
    this.setState({
      locale: locale
    });
    localStorage.setItem('messages', JSON.stringify(messages?.[locale]))

    this.getRem(720, 100);
    window.onresize = function(){
      _this.getRem(720,100);
    };
    window.addEventListener('hashchange', function(){
      _this.checkIsShowHeader()
    }, false)
  }

  checkIsShowHeader = () => {
    const hash = window.location.hash;
    switch(hash){
      case '#/':
      case '#/Login':
      case '#/Register':
        getAppStore().dispatch(setHeader(false, ''))
        break;
      default:
        getAppStore().dispatch(setHeader(true, 'Fairsroom'))
        break;
    }
  }

  getLocaleLaunguage(){
    var language = "en_US";
    var jsSrc =(navigator.language).toLowerCase();
    console.info("locale launguage: " + jsSrc);

    if(jsSrc === "zh-cn"){
      language = LanuageType.zh_CN
    }else if(jsSrc === "en_us"){
      language = LanuageType.en_US
    }else if(jsSrc === "ja_jp"){
      language = LanuageType.ja_JP
    }else if (jsSrc === "ru_ru"){
      language = LanuageType.ru_RU
    }
    return language;
  }


  getRem = (pwidth: number, prem: number) => {
    /*pwidth代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;prem代表换算比例，这里写100是
      为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + "px";
  }

  render() {
    return (
      <div className="App">
        {this.props?.isShowSlideBar && <SlideBar messages={messages} />}
        {this.props?.isShowHeader && <HongErHeader/>}
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/Detail' component={Detail}/>
          <Route path='/ProductDetail' component={ProductDetail}/>
          <Route path='/Login' component={Login}/>
          <Route path='/Register' component={Register}/>
          <Route path='/Profile' component={Profile}/>
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: IMState) => {
  return {
    isShowSlideBar: state?.isShowSlideBar || false,
    isShowHeader: state?.isShowHeader || false
  }
}
export default connect(mapStateToProps, {})(_App);

