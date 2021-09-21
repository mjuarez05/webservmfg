//dependencias
import React, { PureComponent } from "react";

//assets
import styles from "./styles.module.scss";

//componentes

class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        <small>by fvicente - 2018</small>
      </div>
    );
  }
}

export default Footer;
