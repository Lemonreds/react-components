import React from 'react';
import { Link } from 'react-router-dom';
import BackToTop from 'components/BackToTop';
import Footer from './Footer';
import Themes from './Themes';
import styles from './styles.less';

import '../global.less';

const menus = [
  {
    label: '组件',
    value: '/comp',
  },
  {
    label: 'Hook',
    value: '/hook',
  },
  {
    label: 'Demo',
    value: '/third-party',
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

    const isSkinPage = location.href.includes('skin');

    return (
      <div className={styles.root}>
        {!isSkinPage && (
          <nav className={styles.navbar}>
            <h3 className={styles.title}>ReactComponents</h3>
            <div className={styles.links}>
              {menus.map(({ label, value }) => {
                return (
                  <Link
                    to={value}
                    key={value}
                    className={
                      location.href.includes(value) ? styles.active : ''
                    }
                  >
                    {label}
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
        )}
        <div className={styles.content}>{children}</div>
        <BackToTop />
        {!isSkinPage && <Footer />}
        <Themes />
      </div>
    );
  }
}

export default Layout;
