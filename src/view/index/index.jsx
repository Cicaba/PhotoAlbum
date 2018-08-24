import React, { Component } from 'react';
import store from "../../redux/store";
import axios from 'axios';
import { Slider, Card, Loader } from 'amazeui-touch';
import Modal from "../../Components/Modal";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      headImgs: [],
      imgList: [],
      loading: false
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
    //获取分类图片
    axios.post(`/index/classify/head`, { userName: store.getState().userName })
      .then(res => {
        this.setState({
          headImgs: res.data.data.data ? res.data.data.data : [],
          loading: false
        });
      }).catch(() => {
        this.setState({
          loading: false
        });
      });
    let url = [];
    let imgList = [];
    this.props.state.classify.map(v => {
      if (v.code != "head") {
        url.push(axios.post(`/index/classify/${v.code}`, { userName: store.getState().userName }));
      }
    });
    axios.all(url)
      .then(res => {
        res.map(v => {
          if (v.data.success) {
            imgList.push(v.data.data);
          }
        });
        this.setState({ imgList });
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
    //分类图片
    let classify = () => {
      return this.state.imgList.map((v) => {
        return (<Card title={v.name} className="classify" key={v.type} style={{ margin: "0.6rem 0" }}>
          {v.data.map((img) => {
            return (<div key={img.name}><img src={img.base64} width="100%" /></div>);
          })}
        </Card>);
      });
    };
    return (
      <div className="index">
        <div className="indexContent">
          {/* 轮播 */}
          <Slider controls={false} autoPlay={true} style={{ height: "12rem", overflow: "hidden" }}>
            {shuffling()}
          </Slider>
          {/* 分类 */}
          {this.state.imgList.length == 0 ? <Loader rounded={true}></Loader> : classify()}
        </div>

        {/* loading */}
        <Modal loading={this.state.loading} text="小哥哥正在为你努力加载中..."></Modal>
      </div>
    );
  }
  shouldComponentUpdate() {
    let isUpdate = true;
    this.props.history.listen(location => {
      isUpdate = false;
    });
    return isUpdate;
  }
}