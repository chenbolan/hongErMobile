import * as React from "react";
import {DetailBase} from './conponents/detailBaseComponents';
import {requestUrl, request} from '../../request'
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import {Product} from './conponents/product'
require('./style/productDetail.scss');

interface Props {
  isLogin?: boolean;
  showLogin?: () => void;
}


export class _HomePage extends DetailBase{

  changeCat = (catIndex: number) => {
    this.setState({
      catIndex: catIndex
    });
  }

  render() {
      const {descriptionData, catIndex} = this.state;
      let messages: any = localStorage.getItem('messages') || '{}';

      const detailData = descriptionData?.[0];
      const threeDLink = detailData?.threeDLink;
      console.log(descriptionData)
      messages = JSON.parse(messages);

      return <div className="detail-page">
        <div className="detail_menu_con">
          <div className="classify d-flex">
            <div className="sort_name">{descriptionData?.[0]?.bigCategory}</div>
            <div className="contcat_us">
              <div></div>
              {messages?.contactUs}
            </div>
          </div>
          <ul className="sort_con">
            {descriptionData.map((el, index) => {
              return <li onClick={() => {this.changeCat(index)}}>
                {el.productName}
                {index === catIndex && <span></span>}
              </li>
            })}
          </ul>
        </div>
        <Product detailIndex={0} descriptionData={descriptionData[catIndex]}/>
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