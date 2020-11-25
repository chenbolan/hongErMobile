import * as React from "react";
import Cookies from 'js-cookie';
import './homePage.scss'
import {requestUrl, request}  from '../../request';
import { message } from 'antd';
import {BaseWidget, AllWidgetProps} from '../../HE-ui';
import {getAppStore, toggleSlideBar, setHeader} from '../../redux'
interface Props {}
interface State {
  isHome: boolean;
  logoUrl: string
}

export default class HomePage extends BaseWidget<AllWidgetProps<{}> & Props, State> {
  constructor(props: any){
    super(props);
    this.state={
      isHome: false,
      logoUrl: ''
    }
  }

  componentDidMount(){
    this.initMap();
  }

  initMap = () => {
    const host = "https://" + window.location.host;
    const url = requestUrl.boothLayoutUrl + "?lang=" + Cookies.get("lang")
    request(url, {domainUrl: host}).then((data: any) => {
      if (data.code === 200) {
        const upLoadShowUrl= "https://exhibitionplatform.oss-cn-hongkong.aliyuncs.com/";
        const logoUrl = `${upLoadShowUrl}${data.data.logo}` || '';

        let layoutId;
        layoutId=data.data.layoutId;
        var exhibitionDesc = data.data.exhibitionDesc;
        var sponsorUrl = data.data.sponsorUrl;
        $("#wordpress").html('<strong>主办方链接</strong> ' + sponsorUrl);
        $("#titleDesc").html(exhibitionDesc);
        $("#zhanhuiLogo").attr("src",upLoadShowUrl + data.data.logo);
        $("#pdfUrl").val(upLoadShowUrl + data.data.pdfUrl);
        var dataStr = JSON.parse(data.data.mapJson);
        const windows:any = window;
        windows?.init(dataStr);
        this.setState({
          logoUrl: logoUrl
        });
      } else {
        message.error(data.message)
      }
    })
  }

  showSlidebar = () => {
    getAppStore().dispatch(toggleSlideBar(true))
  }

  render() {
    const {logoUrl} = this.state;
    return <div className="home-page">
      <div className="home-page-header">
        <div className="logo-con">
          <img src={logoUrl} alt=""/>
        </div>
        <div className="slide-bar-btn" onClick={this.showSlidebar}>
          <span></span>
        </div>
      </div>
      <div className="main">
        <section id="map-section" className="inner over" style={{"paddingBottom": "0px"}}>
          <div className="map-container">
              <div id="mapplic"></div>
          </div>
        </section>
      </div>
    </div>;
  }
}