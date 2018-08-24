import React, { Component } from 'react';
import { Field, Icon, List } from 'amazeui-touch';
import './style';
import Modal from "../../Components/Modal";
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: "60",
      selectDefault: "rests",
      img: null,
      loading: false
    };
  }
  render() {
    return (
      <div className="update">
        {/* 文件上传 */}
        <List>
          <List.Item nested="input">
            <Field
              type="select"
              label="分类:"
              ref="select"
              defaultValue={this.state.selectDefault}>
              {this.selectOption()}
            </Field>
          </List.Item>
          <List.Item nested="input">
            <Field
              label="压缩比:"
              type="range"
              ref="range"
              defaultValue={this.state.range} />
          </List.Item>
        </List>
        <div className="btm">
          <input type="file" onChange={e => this.upload(e)} multiple="multiple" />
          <div>
            {this.state.img ? <img src={this.state.img} width='100%' /> : <Icon name="plus"></Icon>}
          </div>
        </div>
        {/* loading */}
        <Modal loading={this.state.loading} text="小哥哥正在为你努力保存中..."></Modal>
      </div>
    );
  }
  //selected
  selectOption() {
    return this.props.state.classify.map(v => {
      return (
        <option key={v.code} value={v.code}>{v.name}</option>
      );
    });
  }
  //文件处理
  upload(e) {
    this.setState({ img: null });
    let quality = (Number(this.refs.range.getValue()) / 100).toFixed(1);
    quality = Number(quality) ? quality : '0.5';
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
    reader.onload = async (evt) => { //读取完文件之后会回来这里
      //大于1m文件进行压缩
      if (evt.total / 1024 > 1024) {
        let name = files[fileLength].name;
        await canvasDataURL(evt.target.result, { quality }).then(base64 => {
          this.setState({ img: base64 });
          imgs.push({
            base64,
            name
          });
        });
      } else {
        let fileString = {
          base64: evt.target.result,
          name: files[fileLength].name
        };
        imgs.push(fileString);
        this.setState({ img: imgs[0]['base64'] });
      }
      fileLength++;
      if (fileLength < files.length) {
        reader.readAsDataURL(files[fileLength]);
      } else {
        await this.uploadImg(imgs);
      }
    };
  }
  //上传图片
  uploadImg(imgs) {
    let query = {
      imgs: imgs,
      userName: this.props.state.userName,
      userId: this.props.state.id,
      type: this.refs.select.getValue()
    };
    this.setState({ loading: true });
    axios.post("/index/upData", query)
      .then(res => {
        this.setState({ loading: false });
      }).catch(e => {
        this.setState({ loading: false });
      });
  }
}

//图片压缩
function canvasDataURL(path, obj, callback) {
  return new Promise((resolve, rejects) => {
    let img = new Image();
    img.src = path;
    img.onload = function () {
      let that = this;
      // 默认按比例压缩
      let w = that.width,
        h = that.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      let quality = 0.7; // 默认图片质量为0.7
      //生成canvas
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = w;
      let anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      resolve(base64);
      callback && callback(base64);
    };
  });

}