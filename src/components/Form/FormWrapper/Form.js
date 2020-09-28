import React from 'react';
import FieldForm, { useForm } from 'rc-field-form';
import FormItem from './FormItem';

function Form({ form, children, ...rest }) {
  const [wrapForm] = useForm();
  const _wrapForm = form || wrapForm;
  return (
    <FieldForm form={_wrapForm} {...rest}>
      {children}
    </FieldForm>
  );
}

Form.Item = FormItem;

export default Form;
