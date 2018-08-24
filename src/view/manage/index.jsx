import React, { Component } from 'react';
import SelectImg from '../../Components/selectImg';
import { Modal, List, Field, ButtonGroup, Button } from 'amazeui-touch';
import Loading from "../../Components/Modal";
export default class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDefault: "rests",
      imgList: [],
      selectedImg: [],
      open: false,
      loading: false
    };
  }
  getImg() {
    let url = [];
    let imgList = [];
    this.props.state.classify.map(v => {
      url.push(axios.post(`/index/classify/${v.code}`, { userName: this.props.state.userName }));
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
  componentDidMount() {
    this.getImg();
  }
  classify() {
    this.setState({ open: true });
  }
  selectedChange(arr) {
    this.setState({ selectedImg: arr });
  }
  handleAction(data) {
    this.setState({ open: false });
    this.setState({ loading: true });
    if (data) {
      let query = {
        classify: this.refs.select.getValue(),
        imgs: this.state.selectedImg,
        userName: this.props.state.userName,
        id: this.props.state.id
      };
      axios.post('/index/modify/classify', query).then(res => {
        this.setState({ selectedImg: [] });
        this.getImg();
        this.setState({ loading: false });
      }).catch(err => {
        this.setState({ loading: false });
      });
    } else {
      this.setState({ open: false });
    }
  }
  Delete() {
    this.setState({ loading: true });
    let query = {
      imgs: this.state.selectedImg,
      userName: this.props.state.userName,
      id: this.props.state.id
    };
    axios.post('/index/modify/delect', query).then(res => {
      this.getImg();
      this.setState({ selectedImg: [] });
      this.setState({ loading: false });
      this.setState({ open: false });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }
  //selected
  selectOption() {
    return this.props.state.classify.map(v => {
      return (
        <option key={v.code} value={v.code}>{v.name}</option>
      );
    });
  }
  render() {

    return (
      <div className="SelectImg">
        <SelectImg data={this.state.imgList} selectedChange={(arr) => this.selectedChange(arr)}></SelectImg>
        {this.state.selectedImg.length > 0 &&
          <ButtonGroup amStyle="primary" justify>
            <Button onClick={() => this.classify()}>分类</Button>
            <Button onClick={() => this.Delete()} amStyle="alert">删除</Button>
          </ButtonGroup>
        }
        <Modal ref="modal" role="confirm" isOpen={this.state.open} onAction={e => this.handleAction(e)}>
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
          </List>
        </Modal>
        <Loading loading={this.state.loading} text="哥哥正在为你努力处理中..."></Loading>
      </div>
    );
  }
}