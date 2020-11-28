import * as React from "react";
import {requestUrl, request}  from '../../request';
import { message, Modal, Form, Input, Button } from 'antd';
require('./register.scss');
const messages: any = JSON.parse(localStorage.getItem('messages') || '{}');
interface Props {
  messages: any;
  showLogin: () => void;
}
interface State {
  openPop: boolean;
}
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

export default class Register extends React.Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state={
      openPop: false
    }
  }

  componentDidMount(){}

  onFinish = (values: {[key: string]: any}) => {
    const _this = this;
    const host = "https://" + window.location.host;
    values.domainUrl=host;
    request(requestUrl.registerUrl, values).then((data: any) => {
      if(data.code == 200){
        message.success(messages.registerSuccess);
        // Cookies.set('userName', values.username);
        _this.toLogin()
      }else{
        message.error(data.message)
      }
    })

  };

  onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
  };

  toggleLoginPop = (isOpen = false) => {
    this.setState({
      openPop: isOpen
    });
  }

  toLogin = () => {
    window.history.go(-1)
  }

  render() {
      return <div className="register_con">
        <div className="reg-title">
          <span className="reg-text">{messages.register}</span>
          <span>{messages.title}</span>
        </div>
        <div className="form-con">
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label={messages.name}
              name="username"
              rules={[{ required: true, message: messages.remind1 },{ pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文，数字或下划线组成!'}]}
            >
              <Input  placeholder={messages.remind1}/>
            </Form.Item>

            <Form.Item
              label={messages.email}
              name="email"
              rules={[{ required: true, message: messages.remind3 }]}
            >
              <Input  placeholder={messages.remind3}/>
            </Form.Item>

            <Form.Item
              label={messages.tel}
              name="telePhone"
              rules={[{ required: true, message: messages.remind4 }]}
            >
              <Input type="number" placeholder={messages.remind4} />
            </Form.Item>

            <Form.Item
              label={messages.passworld}
              name="password"
              rules={[{ required: true, message: messages.remind2 }]}
            >
              <Input.Password type="password" placeholder={messages.remind2} />
            </Form.Item>

            <Form.Item
              label={messages.confirmPsw}
              name="password2"
              rules={[{ required: true, message: messages.remind5 }]}
              className="confirm_psw"
            >
              <Input placeholder={messages.remind5} />
            </Form.Item>

            <Form.Item {...tailLayout} className="confirm_btn_con">
              <div>
                <Button type="primary" htmlType="submit">
                  {messages.register}
                </Button>
              </div>
              <div className="flex-grow-1 to_login">
                <div>{messages.hadAccount}</div>
                <span onClick={this.toLogin}>{messages.login}</span>
              </div>
            </Form.Item>
          </Form>
        </div>
   </div>
  }
}
