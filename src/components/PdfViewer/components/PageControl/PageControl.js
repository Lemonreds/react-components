import React from 'react';
import FeedBack from '@/components/FeedBack';
import styles from './PageControl.less';

const PageControl = props => {
  const { pageNumber, numPages, onPrev, onNext } = props;

  const hasPrev = pageNumber !== 1;
  const hasNext = pageNumber !== numPages;

  return (
    <div className={styles.pageControl}>
      <FeedBack activeClassName={styles.active}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            if (hasPrev && onPrev) {
              onPrev();
            }
          }}
        >
          prev
        </button>
      </FeedBack>

      <span className={styles.text}>
        {pageNumber}
        of
        {numPages}
      </span>
      <FeedBack activeClassName={styles.active}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            if (hasNext && onNext) {
              onNext();
            }
          }}
        >
          next
        </button>
      </FeedBack>
    </div>
  );
};

export default PageControl;
