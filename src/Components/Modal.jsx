import React, { Component } from 'react';
import { Modal } from 'amazeui-touch';
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {/* loading */}
        <Modal
          title={this.props.text}
          role="loading"
          isOpen={this.props.loading}
        ></Modal>
      </div>
    );
  }
}