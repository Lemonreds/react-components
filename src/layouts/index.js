import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.less';

const menus = [
  {
    label: 'Components',
    value: '/comp',
  },
  {
    label: 'hook',
    value: '/hook',
  },
];

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <nav className={styles.navbar}>
          <div className={styles.links}>
            {menus.map(({ label, value }) => (
              <Link
                to={value}
                key={value}
                // className={location.href.includes(value) ? styles.active : ''}
              >
                {label}
              </Link>
            ))}
            <a
              target=" _blank"
              href="https://github.com/Lemonreds/react-components"
            >
              github
            </a>
          </div>
        </nav>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export default Layout;
