import React, { PureComponent } from "react";
import { Icon } from "react-fa";
import styles from "./styles.module.scss";
import { removeTab } from "../../actionCreators";
import store from "../../store";

export default class Tab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }

  handlerClick = () => {
    const { onTabClick } = this.props;
    onTabClick();
  };

  handlerRemoveTab = e => {
    store.dispatch(removeTab(e.target.id));
  };

  render() {
    return (
      <div
        className={
          this.props.active
            ? styles.container + " " + styles.active
            : styles.container
        }
      >
        <span onClick={this.handlerClick}>{this.props.children}</span>

        {this.props.closable && (
          <Icon
            name="close"
            id={this.props.id}
            className={styles.close}
            onClick={this.handlerRemoveTab}
          />
        )}
      </div>
    );
  }
}
