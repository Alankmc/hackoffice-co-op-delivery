import React, { useState } from "react";
import styled from "styled-components";
import InputField from "../../components/input-field";
import Button from "../../components/button";
import { Link } from "react-router-dom";

const SignUpPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [moreInfo, setMoreInfo] = useState("");

  return (
    <div>
      <h1>Cadastre-se</h1>
      <div>Entra ae para dar boa</div>
      <div>
        <InputField
          placeholder="Email"
          type="text"
          onChange={({ target: { value } }) => setEmail(value)}
          value={email}
        />
        <InputField
          placeholder="Senha"
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          value={password}
        />
      </div>
      <Link to="/">
        <Button type="button">Voltar</Button>
      </Link>
      <Button type="button">Submeter</Button>
    </div>
  );
};

export default SignUpPage;
