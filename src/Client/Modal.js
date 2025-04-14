import React from "react";
import "./Modal.scss";

class Modal extends React.Component {
  state = {
    listItem: [],
  };
  componentDidMount() {
    const { listItem } = this.props.listItem;
    this.setItem({
      listItem: listItem,
    });
  }
  render() {
    let { listItem } = this.state;
    return (
      <div className="container-modal-customer">
        <ul className="modal-list-customer">
          <li className="modal-item-customer">
            <a href="#">Modal 1</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Modal;
