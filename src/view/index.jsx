import React, { Component } from 'react';
import { Grid, Col, Field, Button, Modal } from 'amazeui-touch';

export default class Index extends Component {
  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.replace("/login");
    }
  }
  render() {
    return (
      <div>
        <Field type="file" onChange={e => this.upload(e)} multiple></Field>
      </div>
    );
  }
  upload(e) {
    let reader = new FileReader();//新建一个FileReader
    let files = e.target.files;
    let imgs = [];
    for (let file of files) {
      console.log(file);
      //读取文件
      imgs.push(reader.readAsDataURL(file));
    }
    reader.onload = function (evt) { //读取完文件之后会回来这里
      var fileString = evt.target.result;
      //post方式上传图片到控制器
      console.log(fileString);
    };
  }
}