import React, {Component} from 'react';
import '../stylus/login';
import {Grid, Col, Field, Button} from 'amazeui-touch';
import img from '../images/timg.jpg';

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div>
          <img src={img}/>
        </div>
        <Grid>
          <Col cols={5} className="form-set">
            <Field placeholder="用户名或Email"/>
            <Field placeholder="密码" type="password"/>
            <Button amStyle="primary" block>登&emsp;陆</Button>
            <Col className="register">
              <Button hollow amStyle="success" amSize="xs">忘记密码</Button>
              <Button hollow amStyle="success" amSize="xs">注册账号</Button>
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}