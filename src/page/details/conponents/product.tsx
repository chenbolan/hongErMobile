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
}

export class Product extends React.Component<Props & ExtProps, State> {
  constructor(props: any){
    super(props);
    this.state={
      openPop: false
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
            {this.getCarouselItem(el, false)}
          </div>
        );
        item.push(itemEmlement)
      })
    }

    return item;
  }

  getCarouselItem = (url: string, isVedio =false) => {
    if(!isVedio){
      const urls = url || ''
      return (
        <div className="c-img" style={{backgroundImage:`url(${urls})`}}></div>
      )
    }else{
      return (<div className="c-img"><video style={{height: '100%'}} controls className="video-player" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" src={url}/></div>)
    }
  }

  render() {
    const {descriptionData} = this.props;
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
   </div>
  }
}
