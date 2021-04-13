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
        <Input
          type="text"
          className="form-inputs"
          placeholder="Nome completo do destinatário"
          minLength="3"
          maxLength="8"
        />
        <Input
          type="text"
          className="form-inputs"
          placeholder="Código de entrega"
          minLength="3"
          maxLength="6"
        />
      </Form>
    </div>
  );
};

export default RegisterUser;
