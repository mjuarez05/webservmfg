import React, { PureComponent } from "react";

import styles from "./styles.module.scss";

export default class Card extends PureComponent {
  render() {
    return <div className={styles.component}>{this.props.children}</div>;
  }
}
