import React, { PureComponent } from "react";

import styles from "./styles.module.scss";

export default class LeftBarBottom extends PureComponent {
  render() {
    let newContainer = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          state: "bottom"
        });
      }
    );

    return <div className={styles.container}>{newContainer}</div>;
  }
}
