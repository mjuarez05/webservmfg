//dependencias
import React, { PureComponent } from "react";

//assets
import styles from "./styles.module.scss";

//componentes
class Content extends PureComponent {
  render() {
    return <div className={styles.content}>{this.props.children}</div>;
  }
}

export default Content;
