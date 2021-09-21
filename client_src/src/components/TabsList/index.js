import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

export default class TabsList extends PureComponent {
  render() {
    const { activeTab } = this.props;

    let newTabList = React.Children.map(this.props.children, (child, index) => {
      let active = activeTab === index;
      return React.cloneElement(child, {
        active,
        onTabClick: () => this.props.onTabClick(index)
      });
    });

    return <div className={styles.container}>{newTabList}</div>;
  }
}
