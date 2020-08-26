import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.less';

const menus = [
  {
    label: 'Components',
    value: '/comp',
  },
  {
    label: 'Hook',
    value: '/hook',
  },
  {
    label: 'Tool',
    value: '/tool',
  },
];

class Layout extends React.Component {
  
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <nav className={styles.navbar}>
          <div className={styles.links}>
            {menus.map(({ label, value }) => {
              return (
                <Link
                  to={value}
                  key={value}
                  className={location.href.includes(value) ? styles.active : ''}
                >
                  {label}
                  {/* </span> */}
                </Link>
              );
            })}
            <a
              target=" _blank"
              href="https://github.com/Lemonreds/react-components"
            >
              Github
            </a>
          </div>
        </nav>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export default Layout;
