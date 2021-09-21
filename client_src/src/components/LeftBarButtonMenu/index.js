import React, { PureComponent } from "react";
import { Icon } from "react-fa";
import onClickOutside from "react-onclickoutside";
import styles from "./styles.module.scss";
import store from "../../store";

class LeftBarButtonMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      closed: true,
      selected: ""
    };

    store.subscribe(e => {
      this.setState({
        closed: store.getState().menuClosed
      });
    });
  }
  createStyles = () => {
    let names = [styles.component];
    if (this.props.disabled) names.push(styles.disabled);
    if (!this.state.closed) names.push(styles.opened);
    return names.join(" ");
  };

  handlerOpenDropDown = () => {
    this.setState(prevState => ({
      closed: !prevState.closed
    }));
  };

  onSelectClick = selected => {
    this.setState({ selected: selected, closed: true });
  };

  handleClickOutside = evt => {
    this.setState({ closed: true });
  };

  render() {
    let disabled = this.props.disabled ? "disabled" : "";
    let selected =
      this.state.selected === "" ? (
        this.props.text !== undefined ? (
          <span className={styles.title}>{this.props.text}</span>
        ) : (
          ""
        )
      ) : (
        <span className={styles.title}>{this.state.selected}</span>
      );

    let listClass = this.state.closed
      ? this.props.fullmenu === true
        ? styles.list + " " + styles.fullmenu + " " + styles.closed
        : styles.list + " " + styles.closed
      : this.props.fullmenu === true
        ? styles.list + " " + styles.fullmenu + " "
        : styles.list;

    let newButtonList = React.Children.map(
      this.props.children,
      (child, index) => {
        let selected = this.state.selected;
        return React.cloneElement(child, {
          selected,
          onSelectClick: selected => this.onSelectClick(selected)
        });
      }
    );

    let size = {
      width: "var(--default-width-menu)",
      padding: "var(--default-padding)"
    };
    if (this.props.width) {
      size.width = this.props.width;
    }

    if (this.props.padding !== "default" && this.props.padding !== undefined) {
      size.padding = this.props.padding;
    }

    return (
      <div className={styles.container}>
        <button
          className={this.createStyles()}
          id={this.props.id}
          disabled={disabled}
          onClick={this.handlerOpenDropDown}
        >
          {this.props.icon ? <Icon name={this.props.icon} /> : ""}
          {selected}
        </button>
        <div className={listClass} style={size}>
          {newButtonList}
        </div>
      </div>
    );
  }
}

export default onClickOutside(LeftBarButtonMenu);
