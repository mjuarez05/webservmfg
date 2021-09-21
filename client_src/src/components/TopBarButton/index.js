import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
import { Icon } from "react-fa";

export default class TopBarButton extends PureComponent {
  createStyles = () => {
    let names = [styles.component];
    if (this.props.disabled) names.push(styles.disabled);
    return names.join(" ");
  };
  clear() {
    this.input.value = "";
  }
  render() {
    let disabled = this.props.disabled ? "disabled" : "";

    return (
      <button
        className={this.createStyles()}
        id={this.props.id}
        ref={input => (this.input = input)}
        disabled={disabled}
        type={this.props.type}
        onClick={this.props.onPress}
      >
        {this.props.icon ? <Icon name={this.props.icon} /> : ""}
        {this.props.text ? (
          <span className={styles.title}>{this.props.text}</span>
        ) : (
          ""
        )}
      </button>
    );
  }
}
