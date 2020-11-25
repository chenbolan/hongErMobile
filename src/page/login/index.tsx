import * as React from "react";
import {requestUrl, request}  from '../../request';
import Cookies from 'js-cookie';
import { message, Form, Input, Button, Checkbox } from 'antd';
import { connect } from "react-redux";
const messages: any = JSON.parse(localStorage.getItem('messages') || '{}');
require('./login.scss')
interface Props {}
interface ExtProps {
  loginStatus: number;
  changeLoginStatus?: (loginStatus: number) => void;
}
interface State {}
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

export class _Login extends React.Component<Props & ExtProps, State> {
  componentDidMount(){}
  componentDidUpdate(preProps: any){
    console.log(preProps, this.props)
  }
  onFinish = (values: {[key: string]: any}) => {
    const {changeLoginStatus} = this.props;
    request(requestUrl.loginUrl, values).then((data: any) => {
      if(data.code === 200){
        message.success(messages.loginSuccess);
        Cookies.set('userName', data?.data?.username)
        window.history.go(-1);
        changeLoginStatus && changeLoginStatus(Math.random())
      }else{
        message.error(data.message);
      }
    });
  };


  toReg = () => {
    window.location.hash='/Register'
  }

  onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return <div className="login-con-mobile">
      <div className="reg-title-mobile">
        <div className="icon_con">{messages.title}</div>
      </div>
      <div className="account_con">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: messages.remind1 }]}
          >
            <Input placeholder={messages.remind1}/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: messages.remind2 }]}
            className="psw-item"
          >
            <Input type="password"  placeholder={messages.remind2} />
          </Form.Item>

          {/* <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item> */}

          <Form.Item {...tailLayout} name="remember" valuePropName="checked" className="remeber_con">
            <Checkbox>{messages.remember}</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout} className="confim_con">
            <div className="confirm_btn_con">
              <Button type="primary" htmlType="submit">
                {messages.login}
              </Button>
            </div>
            <div className="flex-grow-1 no-account">
              {messages.noAccount}
              <span  onClick={this.toReg}>{messages.register}</span>
            </div>
          </Form.Item>
        </Form>
      </div>
   </div>
  }
}
const mapStateToProps = (state: ExtProps) => {
  return {
    loginStatus: state.loginStatus
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLoginStatus: (loginStatus: number) => dispatch({
      type: "LOGIN",
      loginStatus: loginStatus
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(_Login);