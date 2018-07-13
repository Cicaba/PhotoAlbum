import React, { Component } from 'react';
import store from "../redux/store";
import '../stylus/index.styl';
import axios from 'axios';
import { Grid, Col, Field, Button, Modal, Slider, TabBar, Card } from 'amazeui-touch';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      headImgs: [],
      loading: false,
      selected: 0
    };
  }
  //主件将挂载
  componentWillMount() {
    this.setState({
      loading: true
    });
    //验证用户是否登陆
    if (localStorage.getItem('token') === 'null') {
      this.props.history.replace("/login");
    }
    // //获取轮播图片
    // axios.post("/index/getImgs", { userName: store.getState().userName }).then(res => {
    //   if (res.data.success) {
    //     this.setState({
    //       imgs: res.data.data,
    //       loading: false
    //     });
    //   } else {
    //     this.setState({
    //       loading: false
    //     });
    //   }
    // }).catch(() => {
    //   this.setState({
    //     loading: false
    //   });
    // });
    //获取分类图片
    this.props.state.classify.map(v => {
      axios.post(`/index/classify/${v.code}`, { userName: store.getState().userName })
        .then(res => {
          if (v.code === 'head') {
            this.setState({
              headImgs: res.data.data,
              loading: false
            });
          }
        }).catch(() => {
          this.setState({
            loading: false
          });
        });
    });
  }
  render() {
    //轮播处理
    let shuffling = () => {
      let SliderArr = [];
      this.state.headImgs.forEach((v, i) => {
        SliderArr.push(
          <Slider.Item key={i}>
            <img src={v.base64} height="200px" />
          </Slider.Item>);
      });
      return SliderArr;
    };
    return (
      <div className="index">
        {/* 轮播 */}
        <Slider controls={false} autoPlay={false} style={{ height: "12rem", overflow: "hidden" }}>
          {shuffling()}
        </Slider>
        <Card title="Card 标题" style={{ margin: "0.6rem 0" }}>
          <p>Card 内容</p>
        </Card>
        {/* 文件上传 */}
        <Field type="file" onChange={e => this.upload(e)} multiple></Field>

        {/* 工具栏 */}
        <div className="TabBar">
          <TabBar amStyle="dark" onAction={(v, e) => this.TabBar(v, e)}>
            <TabBar.Item selected={this.state.selected == 0} icon="home" title="首页" />
            <TabBar.Item selected={this.state.selected == 1} icon="gear" title="管理" />
            <TabBar.Item selected={this.state.selected == 2} icon="plus" title="上传" />
            <TabBar.Item selected={this.state.selected == 3} icon="person" title="我的" />
          </TabBar>
        </div>
        {/* loading */}
        <Modal
          title="小哥哥正在为你努力加载中..."
          role="loading"
          isOpen={this.state.loading}
        ></Modal>
      </div>
    );
  }
  //文件上传
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
    //读取文件
    reader.readAsDataURL(files[fileLength]);
    reader.onload = (evt) => { //读取完文件之后会回来这里
      let fileString = {
        base64: evt.target.result,
        name: files[fileLength].name
      };
      imgs.push(fileString);
      fileLength++;
      if (fileLength < files.length) {
        reader.readAsDataURL(files[fileLength]);
      } else {
        let query = {
          imgs: imgs,
          userName: localStorage.getItem("userName"),
          userId: localStorage.getItem("userId"),
          type: 'view'
        };
        axios.post("/index/upData", query)
          .then(res => {
            console.log(res);
          });
      }
    };
  }
  //菜单切换
  TabBar(val, e) {
    console.log(val);
    this.setState({
      selected: val
    });
  }
}