//dependecias
import React, {PureComponent} from 'react';

//assets
import styles from './styles.module.scss';

class TopBar extends PureComponent {
  render() {
    let newContainer = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          state: 'main',
        });
      },
    );

    return <div className={styles.topbar}>{newContainer}</div>;
  }
}

export default TopBar;
