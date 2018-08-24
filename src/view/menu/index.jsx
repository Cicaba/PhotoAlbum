import React, { Component } from 'react';
import './index.styl';
import { TabBar } from 'amazeui-touch';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.state.menuSelected
    };
  }
  componentWillMount() {
    if (this.props.history.location.pathname == '/') {
      this.props.history.push('/index');
    }
  }
  render() {
    return (
      <div className="index">
        {this.props.children}
        {/* 工具栏 */}
        <div className="TabBar">
          <TabBar amStyle="dark" onAction={(v, e) => this.TabBar(v, e)}>
            <TabBar.Item selected={this.state.selected == 0} icon="home" title="首页" />
            <TabBar.Item selected={this.state.selected == 1} icon="plus" title="上传" />
            <TabBar.Item selected={this.state.selected == 2} icon="gear" title="管理" />
            <TabBar.Item selected={this.state.selected == 3} icon="person" title="我的" />
          </TabBar>
        </div>
      </div>
    );
  }
  //菜单切换
  TabBar(val, e) {
    this.props.changeSelected({ type: "setSelected", data: val });
    if (val == 0) {
      this.props.history.replace('/index');
    } else if (val == 1) {
      this.props.history.replace('/update');
    } else if (val == 2) {
      this.props.history.replace('/manage');
    }
  }
}
