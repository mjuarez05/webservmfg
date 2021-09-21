import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

export default class Isotype extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <img src={this.props.isologo} alt={this.props.name} />
      </div>
    );
  }
}
