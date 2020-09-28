import React, { Component, cloneElement } from "react";
import { Field } from "rc-field-form";
import FormLabel from "./FormLabel";
import FormValue from "./FormValue";

import styles from "./FormItem.less";

const Row = ({ children }) => <div className={styles.row}>{children}</div>;

class FormItem extends Component {
  renderLayout = ({ label, isRequired }, { control, meta, children }) => {
    return (
      <Row>
        <FormLabel isRequired={isRequired} label={label} />
        <FormValue errors={meta.errors}>
          {cloneElement(children, {
            ...children.props,
            ...control,
          })}
        </FormValue>
      </Row>
    );
  };

  render() {
    const {
      children,
      isRequired,
      renderLayout,
      label,
      name,
      rules,
      // ...rest
    } = this.props;
    return (
      <Field name={name} rules={rules}>
        {(control, meta, context) => {
          const _isRequired =
            typeof isRequired !== "undefined"
              ? isRequired
              : rules.some((r) => r.required);

          const _renderLayout =
            renderLayout instanceof Function ? renderLayout : this.renderLayout;
          return _renderLayout(
            { label, isRequired: _isRequired },
            { control, meta, children },
            context,
          );
        }}
      </Field>
    );
  }
}

export default FormItem;
