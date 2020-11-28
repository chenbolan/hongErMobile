import * as React from "react";
import 'antd-mobile/dist/antd-mobile.css';
import { Carousel, WingBlank, Button } from 'antd-mobile';
import {carouselData, descriptionData} from '../config'
// import {requestUrl, request}  from '../../request';
import Cookies from 'js-cookie';
import { connect } from "react-redux";
const messages: any = JSON.parse(localStorage.getItem('messages') || '{}');
require('../style/product.scss');
interface Props {
  descriptionData: descriptionData,
  detailIndex: number
}
interface ExtProps {
}
interface State {
  openPop: boolean;
  fullScreenIndex: number
}

export class Product extends React.Component<Props & ExtProps, State> {
  constructor(props: any){
    super(props);
    this.state={
      openPop: false,
      fullScreenIndex: -1
    }
  }


  getCarouselItems = () => {
    const {descriptionData} = this.props;
    const item = [];
    const detailData = descriptionData?.carouselData
    const videoUrl = detailData?.videoUrl;
    if(videoUrl){
      const itemEmlement = (
        <div key={videoUrl} className="carousel_list">
          {this.getCarouselItem(videoUrl, true)}
        </div>
      );
      item.push(itemEmlement)
    }
    if(detailData?.imgUrl){
      detailData.imgUrl.forEach((el, index) => {
        const itemEmlement = (
          <div key={index} className="carousel_list">
            {this.getCarouselItem(el, false, index)}
          </div>
        );
        item.push(itemEmlement)
      })
    }

    return item;
  }

  getCarouselItem = (url: string, isVedio =false, index: number = 0) => {
    const {fullScreenIndex} = this.state;
    if(!isVedio){
      const urls = url || ''
      return (
        <div className="c-img" style={{backgroundImage:`url(${urls})`}}>
          {fullScreenIndex < 0 && <span className="full_screen_icon" onClick={() => {this.toggleFullScreeen(index)}}></span>}
        </div>
      )
    }else{
      return (<div className="c-img"><video style={{height: '100%'}} controls className="video-player" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" src={url}/></div>)
    }
  }

  getFullScreenItem = () => {
    const {fullScreenIndex} = this.state;
    const {descriptionData} = this.props;
    const item: Array<any> = [];
    const detailData = descriptionData?.carouselData;
    detailData?.imgUrl?.forEach((urls, index) => {
      const fullItem = (<div className="full_screen_box">
        {fullScreenIndex === index && <div className="full_screen_con " onClick={() => {this.toggleFullScreeen(-1)}}>
          <span className="full_screen_icon close_full_screen" onClick={() => {this.toggleFullScreeen(-1)}}></span>
          <img src={urls} alt=""/>
        </div>}
      </div>) as any
      item.push(fullItem)
    });
    return item
  }

  toggleFullScreeen = (index: number) => {
    let {fullScreenIndex} = this.state;
    if(fullScreenIndex > -1){
      fullScreenIndex = -1;
    }else{
      fullScreenIndex = index;
    }
    this.setState({
      fullScreenIndex: fullScreenIndex
    });
  }

  render() {
    const {descriptionData} = this.props;
    const {fullScreenIndex} = this.state;
    return <div className="product_con">
      <div className="carousel_con">
        <WingBlank>
          <Carousel
            className="product_carousel"
            autoplay={false}
            infinite
            dots={true}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
            style={{height: "3.87rem"}}
          >
            {this.getCarouselItems()}
          </Carousel>
        </WingBlank>
      </div>

      <ul className="introduce">
        <li className="introduce_title">
          <span>{descriptionData?.productName || descriptionData?.exhibitorName}</span>
          <div dangerouslySetInnerHTML={{__html: descriptionData?.productDesc}}></div>
        </li>
      </ul>

      {fullScreenIndex > -1 && <div>
        {this.getFullScreenItem()}
      </div>}
   </div>
  }
}
