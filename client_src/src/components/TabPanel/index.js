import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
export default class TabPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }
  render() {
    return (
      <div
        className={
          this.props.active
            ? styles.container + " " + styles.active
            : styles.container
        }
      >
        {this.props.children}
      </div>
    );
  }
}
