import React, {
  forwardRef,
  useState,
  cloneElement,
  useImperativeHandle
} from 'react';
import DropdownMenuItem, { DropdownMenuItemWrap } from './Item';
import Mask from './Mask';
import Body from './Body';
import './DropdownMenu.less';

const DropdownMenu = forwardRef((props, ref) => {
  const [value, setValue] = useState(null);

  useImperativeHandle(
    ref,
    () => ({
      close: () => {
        setValue(null);
      }
    }),
    [setValue]
  );

  const handleMaskClick = () => {
    setValue(null);
  };

  const changeActive = key => {
    if (value === key) {
      setValue(null);
    } else {
      setValue(key);
    }
  };

  const items = [];
  const navs = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...child.props,
        onClick: () => {
          if (child.props.children) {
            changeActive(child.key);
          }
          props.onMenuClick?.(child.key);
        },
        active: child.key === value
      };
      items.push(child);
      return cloneElement(child, childProps);
    } else {
      return child;
    }
  });

  return (
    <div className='dropdown'>
      <div className='dropdown-nav'>{navs}</div>

      <div className='dropdown-popup'>
        <Mask onMaskClick={handleMaskClick} visible={value} />
        <Body visible={value}>
          {items.map(item => {
            const isActive = item.key === value;
            return (
              <DropdownMenuItemWrap
                key={item.key}
                active={isActive}
                arrow={item.props.arrow}
              >
                {item.props.children}
              </DropdownMenuItemWrap>
            );
          })}
        </Body>
      </div>
    </div>
  );
});

DropdownMenu.Item = DropdownMenuItem;

export default DropdownMenu;
