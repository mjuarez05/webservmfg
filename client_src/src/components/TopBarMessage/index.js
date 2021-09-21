import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
export default class TopBarMessage extends PureComponent {
  render() {
    return <div className={styles.msg}>{this.props.children}</div>;
  }
}
