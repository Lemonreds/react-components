import classNames from 'classnames';
import { AtIcon } from 'taro-ui';
import './Item.less';

const classPrefix = `dropdown-item`;

const DropdownMenuItem = props => {
  const { highlight, active, title, arrow, onClick } = props;

  const cls = classNames(classPrefix, {
    [`${classPrefix}-active`]: active,
    [`${classPrefix}-highlight`]: highlight ?? active
  });

  return (
    <div className={cls} onClick={onClick}>
      <div className={`${classPrefix}-title`}>
        <span className={`${classPrefix}-title-text`}>{title}</span>
        {arrow && (
          <span
            className={classNames(`${classPrefix}-title-arrow`, {
              [`${classPrefix}-title-arrow-active`]: active
            })}
          >
            <AtIcon value='chevron-up' />
          </span>
        )}
      </div>
    </div>
  );
};

const DropdownMenuItemWrap = props => {
  const { active } = props;
  const cls = classNames(`${classPrefix}-content`, {
    [`${classPrefix}-content-hidden`]: !active
  });

  return (
    <div className={cls} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default DropdownMenuItem;

export { DropdownMenuItemWrap };
