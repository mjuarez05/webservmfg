import React, { PureComponent } from "react";
import store from "../../store";
import { changeActiveTab } from "../../actionCreators";
export default class TabsContainer extends PureComponent {
  render() {
    let newTabList = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeTab: store.getState().tabActive,
        onTabClick: tabIndex => {
          store.dispatch(changeActiveTab(tabIndex));
        }
      });
    });

    return <div>{newTabList}</div>;
  }
}
