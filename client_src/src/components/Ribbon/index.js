import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

export default class Ribbon extends PureComponent {
  createStyles = () => {
    let names = [styles.container];
    if (this.props.sticky) {
      names.push(styles.sticky);
    }
    switch (this.props.position) {
      case "top-left": {
        names.push(styles.top);
        names.push(styles.left);
        break;
      }
      case "top-right": {
        names.push(styles.top);
        names.push(styles.right);
        break;
      }
      case "bottom-left": {
        names.push(styles.bottom);
        names.push(styles.left);
        break;
      }
      case "bottom-right": {
        names.push(styles.bottom);
        names.push(styles.right);
        break;
      }
      default:
        break;
    }
    return names.join(" ");
  };

  render() {
    return <div className={this.createStyles()}>{this.props.children}</div>;
  }
}
