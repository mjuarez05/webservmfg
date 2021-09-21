import React, { PureComponent } from "react";

import styles from "./styles.module.scss";

export default class LeftBarTop extends PureComponent {
  render() {
    let newContainer = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          state: "top"
        });
      }
    );

    return <div className={styles.container}>{newContainer}</div>;
  }
}
