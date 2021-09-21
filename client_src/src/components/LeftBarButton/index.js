import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
import { Icon } from "react-fa";

export default class LeftBarButton extends PureComponent {
  createStyles = () => {
    let names = [styles.component];
    if (this.props.disabled) names.push(styles.disabled);
    return names.join(" ");
  };

  render() {
    let disabled = this.props.disabled ? "disabled" : "";

    return (
      <button
        className={this.createStyles()}
        id={this.props.id}
        disabled={disabled}
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
