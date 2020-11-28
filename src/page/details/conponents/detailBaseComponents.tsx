import * as React from "react";
import {message} from 'antd';
import {requestUrl, request} from '../../../request'
import Cookies from 'js-cookie';
import {carouselData, descriptionData} from '../config'
import {getAppStore, setHeader} from '../../../redux'
interface Props {
  isLogin?: boolean;
  showLogin?: () => void;
}

interface classify {
  catId: string;
  catName: string;
}

interface State {
  detailIndex: number;
  carouselData: Array<carouselData>;
  classifyData: Array<classify>;
  exhibitorId: string;
  layoutId: string;
  galleryLink: string;
  descriptionData: Array<descriptionData>;
  threeDLink: string;
  currentIndex: number;

  showElem: string;
  showElemClose: string;
  showChatButton: string;
  chatUrl: string;
  isDisplayBoolean: boolean;
  ischatDisplayBoolean: boolean;

  catIndex: number;
}

export class DetailBase extends React.Component<Props, State> {
  carouselRef: any;
  carouselItemRef: any;
  constructor(props: any){
    super(props);
    this.state={
      exhibitorId: '',
      layoutId: '',
      galleryLink: '',
      classifyData: [],
      carouselData: [],
      descriptionData: [],
      detailIndex: 0,
      threeDLink: '',
      currentIndex: 0,
      showElem: "",
      showElemClose: "",
      showChatButton: "none",
      chatUrl: "",
      isDisplayBoolean: false,
      ischatDisplayBoolean: true,
      catIndex: 0
    }
    this.carouselItemRef= React.createRef();
  }

  componentDidMount(){
    if(!!Cookies.get('userName')){
      this.getExhibitorId();
    }else {
      window.location.hash = '/'
    }
  }

  componentDidUpdate(preProps: Props, state: any){
    if(!(preProps?.isLogin === this.props?.isLogin)){
      this.getExhibitorId();
    }
  }

  getClaasify = () => {
    const {exhibitorId, layoutId} = this.state;
    const _this = this;
    const params = {
      layoutId:layoutId,
      id:exhibitorId,
    }
    const url = requestUrl.getCategoryByExhibitorId + "?lang=" + Cookies.get("lang")
    request( url, params).then((data) => {
      if(data.code === 200){
        const newData = data?.data?.map((el:any) => {
          return {
            catName: el?.category,
            catId: el?.id,
          }
        })
        _this.setState({
          classifyData: newData
        },() => {
          _this.getDetail()
        });
      }else{
        message.error(data.message);
      }
    })
  }

  showHeader = (title: string) => {
    getAppStore().dispatch(setHeader(true, title))
  }

  saveCustomerLog = () => {
    const {exhibitorId, layoutId} = this.state;
    const userName = Cookies.get("userName");
    request(requestUrl.saveCustomerLogUrl, {exhibitorId:exhibitorId,userName:userName,layoutId:layoutId}).then(data => {
      if(data.code === 200){
      }else{
        // message.error(data.message);
      }
    })

  }

  initImageUrl = (imgUrl: string) => {
    var upLoadShowUrl= "https://exhibitionplatform.oss-cn-hongkong.aliyuncs.com/";
    const imgData = imgUrl.split(';').map(el => {
      return `${upLoadShowUrl}${el}`
    });
    return imgData
  }

  getDetail = () => {
    const {exhibitorId, currentIndex, classifyData} = this.state;
    const catId = this.getQueryString('catId') || classifyData?.[0].catId;
    const _this = this;
    const params = {
      exhibitorId:exhibitorId,
      catId:catId,
    }
    request(requestUrl.listByCatIdAndExhibitorId, params).then(data => {
      if(data.code === 200){
        var upLoadShowUrl= "https://exhibitionplatform.oss-cn-hongkong.aliyuncs.com/";
        const descriptionData = data?.data?.map((el:any) => {
          const carouselData: carouselData = {};
          carouselData.imgUrl = this.initImageUrl(el?.imgUrl);
          carouselData.videoUrl = el?.videoUrl ? `${upLoadShowUrl}${el?.videoUrl}` : '';
          return {
            exhibitorName: el?.exhibitorName,
            productName: el?.productName,
            productDesc: el?.productDesc,
            galleryLink: el?.galleryLink,
            threeDLink: el?.galleryLink,
            exhibitorLogo: `${upLoadShowUrl}${el?.logo}`,
            carouselData: carouselData,
            bigCategory: el?.bigCategory
          }
        })
        const title = this.getQueryString('catId') ? descriptionData?.[0].bigCategory : descriptionData?.[0].exhibitorName
        this.showHeader(title);
        _this.setState({
          descriptionData: descriptionData
        });
      }else{
        message.error(data.message);
      }
    })
  }

  getExhibitorId = () => {
    const exhibitorId = this.getQueryString('exhibitorId') || '';
    const layoutId = this.getQueryString('layoutId') || '';

    this.setState({
      exhibitorId: exhibitorId,
      layoutId: layoutId,
    },() => {
      if(!exhibitorId || !layoutId) return false;
      this.getClaasify()
      this.saveCustomerLog();
      this.linkCustomService();
      // var host = "https://" + window.location.host;
      const origin = window.location.origin;
      // const href  = host + "/vm/pages/front/im/mainNew.html?exhibitorId=" +  exhibitorId;
      const href  = `${origin}/chat/front/im/mainNew.html?exhibitorId=${exhibitorId}`;
      this.setState({
        chatUrl: href,
      })
    });
  }

  concatUs = () => {
    const {chatUrl} = this.state;
    window.location.href= chatUrl
  }

  getQueryString(key: string): string {
    const hash = window.location.hash;
    const query: Array<string> = hash?.split('?')?.[1]?.split('&');
    let queryObject: {[key: string]: any} = {};
    if(!query) return '';
    query.forEach(el => {
      const params = el.split('=');
      const key = params[0];
      queryObject[key] = params[1];
    })
    const values = queryObject[key] || '';
    return values as string;
  }

  downloadPdfBtn = () => {
    var host = "https://" + window.location.host;
    const href  = host + "/product/download?id=" + this.state.exhibitorId;
    window.open(href)
  }

  goTo3D = () => {
    window.location.href  = this.state.galleryLink;
  }

  linkCustomService = () => {
    const {exhibitorId} = this.state;
    const userName = Cookies.get("userName");
    var host = "https://" + window.location.host;
    if(!userName) return false;

    const params = {
      userName:Cookies.get("userName"),
      exhibitorId:exhibitorId,
    }
    request(requestUrl.linkCustomServiceUrl, params).then(data => {
      if (data != null) {
        Cookies.set("kefuUid",data.data);
        // const href  = host + "/vm/pages/front/im/main.html?exhibitorId=" +  exhibitorId;
        // window.open(href);
      }
    });
  }

  toggleChat = () => {
    this.setState({
      showElem: this.state.showElem==""?"none":"",
      showElemClose: this.state.showElemClose==""?"none":"",

      showChatButton: this.state.showChatButton==""?"none":""
    });
  }

  closeChat = () => {
    this.setState({
      showChatButton: this.state.showChatButton==""?"none":"",
      showElemClose: this.state.showElemClose==""?"none":"",
      showElem: this.state.showElem==""?"none":"",
    });
  }

  toggleChatMore = () => {
    alert("toggleMore");
  }


  toOpendThreeDLink = (link: string) => {
    window.open(link)
  }

}
