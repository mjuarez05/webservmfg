//dependencias
import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

class LeftBar extends PureComponent {
  render() {
    return <div className={styles.leftbar}>{this.props.children}</div>;
  }
}

export default LeftBar;
