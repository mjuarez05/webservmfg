import React, { PureComponent } from "react";

import styles from "./styles.module.scss";

export default class TopBarDropDownItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }

  createStyles = () => {
    let names = [styles.component];
    if (this.props.disabled) names.push(styles.disabled);
    return names.join(" ");
  };

  handlerClick = e => {
    var t = this;
    const { onSelectClick } = this.props;
    onSelectClick(this.props.text);
    t.props.onPress(t.props.value);
  };

  render() {
    let disabled = this.props.disabled ? "disabled" : "";
    return (
      <button
        className={this.createStyles()}
        id={this.props.id}
        disabled={disabled}
        onClick={this.handlerClick}
      >
        {this.props.text}
      </button>
    );
  }
}
