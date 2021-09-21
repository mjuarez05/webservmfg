import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
export default class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    return (
      <div
        className={
          styles.container + " " + (this.state.visible ? "" : styles.hide)
        }
      >
        {this.props.children}
      </div>
    );
  }
}
