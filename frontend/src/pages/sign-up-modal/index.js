import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button, { GreenButton, GhostButton } from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faMapMarkerAlt,
  faStore,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { BASE_URL } from "../../config/env";
import Loader from "../../components/loader";
import InputField from "../../components/input-field";
import FieldAndComponent from "../../components/field-and-component";
import { loginContext } from "../../contexts/login";

const FullWidthInput = styled(InputField)`
  width: 100%;
`;

const CustomH1 = styled.h1`
  margin: 0 0 14px 0;
`;

const FieldAndComponentMargin = styled(FieldAndComponent)`
  margin-bottom: 16px;
`;

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PortalPositioner = styled.div`
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: all 0.3s;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
`;
const FormPositioner = styled.div`
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
  border-radius: 5px;
  width: 350px;
  position: relative;
`;
const Wrapper = styled.div`
  padding: 22px;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

const ExtraMessage = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  background-color: #efefef;
  color: #454545;
  font-size: 0.85rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
  justify-content: center;
`;

const LoginPortion = (props) => {
  const { isSignUpHandler, extraMessage, loginHandler } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <React.Fragment>
      <CustomH1>Login</CustomH1>
      {extraMessage && <ExtraMessage>{extraMessage}</ExtraMessage>}
      <FieldAndComponentMargin field="Email">
        <FullWidthInput
          placeholder="Email"
          value={email}
          type="text"
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </FieldAndComponentMargin>
      <FieldAndComponentMargin field="Senha">
        <FullWidthInput
          value={password}
          type="password"
          placeholder="Senha"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </FieldAndComponentMargin>
      <ButtonWrapper>
        <GhostButton
          onClick={() => isSignUpHandler(true)}
          style={{ marginRight: "12px" }}
        >
          Não tenho conta
        </GhostButton>
        <GreenButton onClick={() => loginHandler({ email, password })}>
          Logar!
        </GreenButton>
      </ButtonWrapper>
    </React.Fragment>
  );
};

const SignUpPortion = (props) => {
  const { isSignUpHandler, registerHandler } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsDontMatch =
    !!password && !!confirmPassword && confirmPassword !== password;
  const goodToGo =
    !!name &&
    !!password &&
    !!email &&
    !!confirmPassword &&
    password === confirmPassword;

  return (
    <React.Fragment>
      <CustomH1>Cadastro</CustomH1>
      <FieldAndComponentMargin field="Nome">
        <FullWidthInput
          placeholder="Nome"
          value={name}
          type="text"
          onChange={({ target: { value } }) => setName(value)}
        />
      </FieldAndComponentMargin>
      <FieldAndComponentMargin field="Email">
        <FullWidthInput
          placeholder="Email"
          value={email}
          type="text"
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </FieldAndComponentMargin>
      <FieldAndComponentMargin field="Senha">
        <FullWidthInput
          value={password}
          error={passwordsDontMatch}
          type="password"
          placeholder="Senha"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        {passwordsDontMatch && (
          <span
            style={{ color: "#d61a1a", fontSize: "0.6rem", marginTop: "4px" }}
          >
            Senhas não são idênticas
          </span>
        )}
      </FieldAndComponentMargin>
      <FieldAndComponentMargin field="Confirmar Senha">
        <FullWidthInput
          value={confirmPassword}
          type="password"
          error={passwordsDontMatch}
          placeholder="Confirmar Senha"
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
        {passwordsDontMatch && (
          <span
            style={{ color: "#d61a1a", fontSize: "0.6rem", marginTop: "4px" }}
          >
            Senhas não são idênticas
          </span>
        )}
      </FieldAndComponentMargin>
      <ButtonWrapper>
        <GhostButton
          onClick={() => isSignUpHandler(false)}
          style={{ marginRight: "12px" }}
        >
          Tenho conta
        </GhostButton>
        <GreenButton
          onClick={() => registerHandler({ name, email, password })}
          disabled={!goodToGo}
        >
          Criar conta
        </GreenButton>
      </ButtonWrapper>
    </React.Fragment>
  );
};

const SignUpPage = (props) => {
  const { closeHandler, extraMessage, registerHandler, loginHandler } = props;
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [hide, setHide] = useState(true);

  useEffect(() => setHide(false), []);

  const triggerClose = () => {
    setHide(true);
    setTimeout(() => closeHandler(), 310);
  };

  return (
    <PortalPositioner hide={hide}>
      <Overlay />
      <FormPositioner>
        {loading && (
          <LoaderOverlay>
            <Loader />
          </LoaderOverlay>
        )}

        <CloseIcon onClick={triggerClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseIcon>

        <Wrapper>
          {isSignUp ? (
            <SignUpPortion
              isSignUpHandler={setIsSignUp}
              registerHandler={registerHandler}
            />
          ) : (
            <LoginPortion
              isSignUpHandler={setIsSignUp}
              extraMessage={extraMessage}
              loginHandler={loginHandler}
            />
          )}
        </Wrapper>
      </FormPositioner>
    </PortalPositioner>
  );
};

const Portalized = (props) => {
  return ReactDOM.createPortal(
    <loginContext.Consumer>
      {(context) => {
        return (
          <SignUpPage
            {...props}
            loading={context.loginLoading}
            registerHandler={context.registerHandler}
            loginHandler={context.loginHandler}
          />
        );
      }}
    </loginContext.Consumer>,
    document.getElementById("root")
  );
};

export default Portalized;
