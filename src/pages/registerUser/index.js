import React from 'react';
import Input from '../../components/Input';
import Form from '../../components/Form';

const RegisterUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(event);
  };

  return (
    <div className="form-container">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input type="text" />
        <Input type="text" />
        <Input type="password" />
      </Form>
    </div>
  );
};

export default RegisterUser;
