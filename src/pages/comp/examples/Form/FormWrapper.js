import React, { useState } from 'react';
import Form from 'components/Form/FormWrapper/Form';
// import Input from 'components/Form/Input';
import Button from 'components/Form/Button';

export default () => {
  const [state, setState] = useState('');

  return (
    <div style={{ width: 230, margin: '0 auto' }}>
      <Form
        onFinish={values => {
          setState(JSON.stringify(values));
        }}
        // onFinishFailed={errorInfo => {
        //   console.log('Failed:', errorInfo);
        // }}
      >
        <Form.Item
          renderLayout={null}
          name="username"
          label="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <input placeholder="Username" autoComplete="off" />
        </Form.Item>
        <Form.Item
          renderLayout={null}
          name="password"
          label="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <input placeholder="Password" type="password" autoComplete="off" />
        </Form.Item>

        <p>{state}</p>
        <Button
          type="submit"
          style={{
            width: 220,
            height: 40,
            background: '#40a9ff',
            fontSize: 16,
            color: '#fff',
            margin: '24px auto',
            display: 'block',
          }}
        >
          提交
        </Button>
      </Form>
    </div>
  );
};
