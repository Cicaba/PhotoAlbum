import React, { Component } from 'react';
import '../stylus/login';
import { Grid, Col, Field, Button, Modal } from 'amazeui-touch';
import img from '../images/timg.jpg';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      loading: false,
      message: "用户名密码必填!",
      useMessage: {
        "useName": null,
        "usePassword": null
      }
    };
  }
  static defaultProps = {
  }
  render() {
    return (
      <div className="login">
        <div>
          <img src={img} />
        </div>
        <Grid>
          <Col cols={5} className="form-set">
            <Field placeholder="用户名或Email" onChange={(e) => this.useName(e)} />
            <Field placeholder="密码" type="password" onChange={(e) => this.usePassword(e)} />
            <Button amStyle="primary" block onClick={() => this.submit()}>登&emsp;陆</Button>
            <Col className="register">
              <Button hollow amStyle="success" onClick={() => this.exploit()} amSize="xs">忘记密码</Button>
              <Button hollow amStyle="success" onClick={() => this.exploit()} amSize="xs">注册账号</Button>
            </Col>
          </Col>
        </Grid>
        <Modal
          ref="modal"
          role="alert"
          isOpen={this.state.isOpen}
          onAction={() => this.clear()}
        >{this.state.message}!</Modal>
        <Modal
          title="登陆中..."
          role="loading"
          isOpen={this.state.loading}
        ></Modal>
      </div>
    );
  }
  //获取用户名
  useName(e) {
    this.setState({
      useMessage: {
        useName: e.target.value,
        usePassword: this.state.useMessage.usePassword
      }
    });
  }
  //用户密码
  usePassword(e) {
    this.setState({
      useMessage: {
        useName: this.state.useMessage.useName,
        usePassword: e.target.value
      }
    });
  }
  //登陆
  submit() {
    if (!this.state.useMessage.useName || !this.state.useMessage.usePassword) {
      this.setState({
        message: "用户名密码必填!",
        isOpen: true
      });
    } else {
      this.setState({
        loading: true
      });
    }
    console.log(this.state);
  }
  //关闭窗口
  clear() {
    this.setState({
      isOpen: false
    });
  }
  //开发中
  exploit() {
    this.setState({
      message: "开发中!!",
      isOpen: true
    });
  }
}