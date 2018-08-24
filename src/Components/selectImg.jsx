
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Loader } from 'amazeui-touch';
export default class SelectImg extends Component {
  constructor(props) {
    super(props);
    this.selectImg = [];
  }
  static defaultProps = {
    data: []
  }
  checkboxChange(e) {
    if (e.target.checked) {
      this.selectImg.push({ type: e.target.dataset.type, name: e.target.dataset.name });
    } else {
      let exist = this.selectImg.find(v => v.name == e.target.dataset.name && v.type == e.target.dataset.type);
      if (exist) {
        this.selectImg.splice(this.selectImg.indexOf(exist), 1);
      }
    }
    this.props.selectedChange(this.selectImg);
  }
  render() {
    //分类图片
    let classify = () => {
      return this.props.data.map((v) => {
        return (<Card title={v.name} className="classify" ref="checkboxImg" key={v.type} style={{ margin: "0.6rem 0" }}>
          {v.data.map((img) => {
            return (
              <div key={img.name}>
                <label htmlFor={img.name + v.type}>
                  <img src={img.base64} width="100%" />
                </label>
                <input type="checkbox" data-type={v.type} data-name={img.name} onChange={(e) => this.checkboxChange(e)} className="radio" id={img.name + v.type} name={img.name} />
              </div>
            );
          })}
        </Card>);
      });
    };
    return (
      <div>
        {/* 分类 */}
        {this.props.data.length == 0 ? <Loader rounded={true}></Loader> : classify()}
      </div>
    );
  }
}
SelectImg.propsTypes = {
  data: PropTypes.Array,
  selectedChange: PropTypes.function
};