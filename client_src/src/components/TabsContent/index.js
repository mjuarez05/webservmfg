import React, { Component } from "react";
import styles from "./styles.module.scss";

export default class TabsContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.activeTab === nextProps.activeTab) return false;
    return true;
  }

  render() {
    const { activeTab, children } = this.props;
    let newTabContent = React.Children.map(children, (child, index) => {
      let active = activeTab === index;
      return React.cloneElement(child, { active, id: "tabContent-" + index });
    });

    return <div className={styles.container}>{newTabContent}</div>;
  }
}
