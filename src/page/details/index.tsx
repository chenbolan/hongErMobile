import * as React from "react";
import {Link} from 'react-router-dom'
import {DetailBase} from './conponents/detailBaseComponents';
import {requestUrl, request} from '../../request'
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import {Product} from './conponents/product'
require('./style/detail.scss');
interface Props {
  isLogin?: boolean;
  showLogin?: () => void;
}


export class _HomePage extends DetailBase{

  toProductDetail = () => {

  }

  render() {
      const {classifyData, currentIndex, descriptionData, detailIndex, exhibitorId, layoutId} = this.state;
      let messages: any = localStorage.getItem('messages') || '{}';
      const detailData = descriptionData?.[0];
      const threeDLink = detailData?.threeDLink;
      console.log(descriptionData)
      messages = JSON.parse(messages);

      return <div className="detail-page">
        <div className="detail_menu_con">
          <img className="product_logo" src={detailData?.exhibitorLogo} alt=""/>
          <ul className="tools_con">
            <li>
              <div className="icon_icon"></div>
              <div>{messages?.sort}</div>
              <span className="underline"></span>
            </li>
            <li className="concat_us" onClick={this.concatUs}>
              <div className="icon_icon"></div>
              <div>{messages?.contactUs}</div>
            </li>
          </ul>
          <ul className="sort_con">
              {classifyData.map((el, index) => {
                return <li>
                  <Link to={{search: `?catId=${el.catId}&exhibitorId=${exhibitorId}&layoutId=${layoutId}`,pathname: '/ProductDetail'}}>
                    {el.catName}
                    {index === 0 && <span></span>}
                  </Link>
                </li>
              })}
          </ul>
        </div>
        <Product detailIndex={0} descriptionData={descriptionData[0]}/>
      </div>;
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    showLogin: () => dispatch({
      type: "ShowLogin",
      isShow: true
    })
  }
}

const mapStateToProps = (state: Props) => {
  return {
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_HomePage)