import React, { PureComponent } from "react";
import { Icon } from "react-fa";
import onClickOutside from "react-onclickoutside";
import styles from "./styles.module.scss";

class TopBarDropDownButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      closed: true,
      selected: ""
    };
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

  componentDidMount() {
    this.setState({
      width: document.getElementById(this.props.id).clientWidth
    });
  }

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
      ? this.props.state === "right"
        ? styles.list + " " + styles.right + " " + styles.closed
        : styles.list + " " + styles.closed
      : this.props.state === "right"
        ? styles.list + " " + styles.right + " "
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
    const size = {
      marginLeft:
        "calc(-14rem + " + this.state.width / 13 + "rem + var(--topbar-height)"
    };
    return (
      <div>
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

export default onClickOutside(TopBarDropDownButton);
