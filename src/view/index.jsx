import React, { Component } from 'react';
import axios from 'axios';
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
    let fileLength = 0;
    let imgs = [];

    for (let file of files) {
      if (file.type !== 'image/jpeg') {
        return;
      }
    }
    console.log(files);
    //读取文件
    reader.readAsDataURL(files[fileLength]);
    reader.onload = (evt) => { //读取完文件之后会回来这里
      let fileString = evt.target.result;
      imgs.push(fileString);
      fileLength++;
      if (fileLength < files.length) {
        reader.readAsDataURL(files[fileLength]);
      }
      axios.post("/index/upData", { imgs: imgs, userName: localStorage.getItem("userName"), userId: localStorage.getItem("userId") })
        .then(res => {
          console.log(res);
        });
    };
  }
}