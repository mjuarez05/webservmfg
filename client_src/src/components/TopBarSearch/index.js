import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
export default class TopBarSearch extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <input
          id={this.props.id}
          type="text"
          placeholder={this.props.placeholder}
          className={styles.search}
          onKeyPress={this.props.onKeyPress}
          onKeyUp={this.props.whenKeyUp}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}
