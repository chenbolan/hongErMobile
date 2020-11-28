import * as React from "react";
import {BaseWidget, AllWidgetProps} from '../baseWidget/baseWidget'
import {IMState, getAppStore, toggleSlideBar} from '../../redux'
import Cookies from 'js-cookie';
import {requestUrl, request}  from '../../request';
import 'animate.css';
import './slideBar.scss';
import {LanuageType, Messages} from '../config';
import { message } from 'antd';
interface Props {
  messages: Messages
}
interface ExtraProps{
  loginStatus?: number
}
interface State {
  userName: string;
  lang: LanuageType;
  pdfUrl: string;
  detail: any
}

export default class SlideBar extends BaseWidget<AllWidgetProps<{}> & ExtraProps & Props, State> {
  constructor(props: any){
    super(props);
    this.state={
      userName: '',
      lang: LanuageType.zh_CN,
      pdfUrl: '',
      detail: {}
    }
  }

  static mapExtraStateProps(state: IMState): ExtraProps{
    const loginStatus = state?.loginStatus || 0;
    return {
      loginStatus: loginStatus,
    }
  }


  componentDidMount(){
    this.getUserLoginMessage();
    this.getLocaleLaunguage();
    this.getHeaderUrl();
  }

  componentDidUpdate(preProps: Props & ExtraProps){
    if(preProps?.loginStatus !== this.props?.loginStatus){
      this.getUserLoginMessage()
    }
  }


  getLocaleLaunguage(){
    const lang: LanuageType = Cookies.get('lang') as LanuageType || LanuageType.zh_CN;
    this.setState({
      lang: lang
    });
    return lang;
  }

  getUserLoginMessage = () => {
    const userName = Cookies.get('userName') || '';
    this.setState({
      userName: userName
    });
  }

  changeLanusge = (lang: LanuageType): void => {
    this.setState({
      lang: lang
    });
    Cookies.set("lang",lang);
    localStorage.setItem('messages', JSON.stringify(this.props.messages?.[lang]))
    //刷新页面
    window.location.reload();
  }

  logOut = () => {
    Cookies.set('userName', '');
    window.location.hash ='/'
    this.getUserLoginMessage()
  }

  toLogin = () => {
    const {userName} = this.state;
    if(userName) return false;
    this.hideMenu()
    window.location.hash = '/Login'
  }

  hideMenu = () => {
    getAppStore().dispatch(toggleSlideBar(false))
  }


  getHeaderUrl = () => {
    const _this = this;
    const host = "https://" + window.location.host;
    if(Cookies.get('lang')==undefined){
      Cookies.set("lang",this.getLocaleLaunguage());
    }
    const url = requestUrl.boothLayoutUrlHeader + "?lang=" + Cookies.get("lang")
    request(url, {domainUrl: host}).then((data) => {
      if (data.code === 200) {

        const upLoadShowUrl= "https://exhibitionplatform.oss-cn-hongkong.aliyuncs.com/";

        const layoutId=data.data.layoutId;
        // var sponsorUrl = data.data.sponsorUrl;
        // $("#wordpress").html('<strong>主办方链接</strong> ' + sponsorUrl);

        const logoUrl = `${upLoadShowUrl}${data.data.logo}` || '';
        const exhibitionDesc = data.data.exhibitionDesc || '';
        const exhibitionTitle = data.data.exhibitionTitle || '';
        _this.setState({
          // loginUrl: logoUrl,
          pdfUrl: `${upLoadShowUrl}${data.data.pdfUrl}` || '',
          // exhibitionDesc:  exhibitionDesc,
          // exhibitionTitle: exhibitionTitle,
        });
        localStorage.setItem('layoutId', layoutId);
        localStorage.setItem('logoUrl', logoUrl);
        localStorage.setItem('exhibitionDesc', exhibitionDesc);
        localStorage.setItem('exhibitionTitle', exhibitionTitle);
        _this.getSynopsis(layoutId);
        document.title = exhibitionDesc;
      } else {
        message.error(data.message)
      }
    })

  }

  getSynopsis = (layoutId = '15') => {
    const _this = this;
    request(requestUrl.detail, {id: layoutId}).then((data) => {
      if (data.code === 200) {
        _this.setState({
          detail: data.data
        });
        Cookies.set("svgUrl",data.data.svgUrl);
        localStorage.setItem("profile",data.data.exhibitionProfile);
      } else {
        message.error(data.message)
      }
    })
  }

  render() {
    const {lang, pdfUrl, userName} = this.state;
      return <div className="slider-bar" onClick={this.hideMenu}>
        <div className="slider-bar-con animated bounce">
          <div className="menu_top">
            <div className="user_con d-flex">
              <img className="user_icon" src={require('../asset/user.png')} alt="head portrait "/>
              <div className="user" onClick={this.toLogin}>{userName || this.messages?.login}</div>
            </div>

            <ul className="menu-list-con">
              <li className="d-flex" onClick={() => {window.location.hash = "/"}}>
                <div className="menu_cion"></div>
                <div className="d-flex-1 menu_text">{this.messages.menu1}</div>
              </li>
              <li className="d-flex" onClick={() => {window.location.hash = "/Profile"}}>
                <div className="menu_cion menu_cion2"></div>
                <div className="d-flex-1 menu_text">{this.messages.menu2}</div>
              </li>
              <li className="d-flex">
                <div className="menu_cion menu_cion3"></div>
                <div className="d-flex-1 menu_text"><a href={pdfUrl} target="_blank">{this.messages.menu3}</a></div>
              </li>
            </ul>

            <div className="lanuage_con">
              <ul >
                <li className={lang === LanuageType.zh_CN ? "active" : ""}>
                  <span></span>
                  <div className="lanuage" onClick={() => {this.changeLanusge(LanuageType.zh_CN)}}>中</div>
                </li>
                <li className={lang === LanuageType.en_US ? "active" : ""}>
                  <span></span>
                  <div className="lanuage" onClick={() => {this.changeLanusge(LanuageType.en_US)}}>EN</div>
                </li>
                <li className={lang === LanuageType.ja_JP ? "active" : ""}>
                  <span></span>
                  <div className="lanuage" onClick={() => {this.changeLanusge(LanuageType.ja_JP)}}>日</div>
                </li>
                <li className={lang === LanuageType.ru_RU ? "active" : ""}>
                  <span></span>
                  <div className="lanuage" onClick={() => {this.changeLanusge(LanuageType.ru_RU)}}> PN</div>
                </li>
              </ul>
              {this.state.userName && <div className="log_out" onClick={this.logOut}>{this.messages.logOut}</div>}
            </div>
          </div>

        </div>
      </div>;
  }
}
