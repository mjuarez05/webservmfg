import React, { PureComponent } from "react";

import styles from "./styles.module.scss";

export default class Input extends PureComponent {
  hanglerOnChange = () => {
    console.log("change");
    this.props.onChange();
  };
  render() {
    let disableType = this.props.disabled ? styles.disabled : "";
    let disabled = this.props.disabled ? "disabled" : "";
    return (
      <div className={styles.container + " " + disableType}>
        <input
          id={this.props.id}
          name={this.props.id}
          className={styles.checkbox}
          type="checkbox"
          onChange={this.hanglerOnChange}
          disabled={disabled}
          checked={this.props.checked}
        />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}
