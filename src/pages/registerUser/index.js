import React, { useState } from 'react';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button/index';
import Header from '../../components/Header';

const userInfo = {
  nomeCompleto: '',
  codigoEntrega: '',
  tamanhoEncomenda: '',
};

const RegisterUser = () => {
  const [user, setUser] = useState(userInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(event);
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            className="form-inputs"
            value={user.nomeCompleto}
            onChange={(e) => setUser({ ...user, nomeCompleto: e.targert.value })}
            placeholder="Nome completo do destinatário"
            minLength="3"
            maxLength="8"
          />
          <Input
            type="text"
            className="form-inputs"
            value={user.codigoEntrega}
            onChange={(e) => setUser({ ...user, codigoEntrega: e.targert.value })}
            placeholder="Código de entrega"
            minLength="3"
            maxLength="6"
          />
          <select
            className="form-inputs"
            defaultValue="Tamanho da encomenda"
            required>
            <option disabled>Tamanho da encomenda</option>
            <option>Pequeno</option>
            <option>Médio</option>
            <option>Grande</option>
          </select>
          <Button
            buttonType="submit"
            buttonClass="button-base"
            buttonOnClick=""
            buttonText="Cadastrar" />
        </Form>
      </div>
    </>
  );
};

export default RegisterUser;
