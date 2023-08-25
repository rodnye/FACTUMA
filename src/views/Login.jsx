
import { useState } from "react";
import {
  View,
  TextField,
  Button,
  Card,
} from "ui";

export default function LoginView({ show }) {
  // display forms
  const [displayLoginForm, setDisplayLoginForm] = useState(true);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);

  // form values
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passField, setPassField] = useState("");
  const [rpassField, setRPassField] = useState("");

  // toggle Login and Register Form
  const toggleForms = () => {
    setDisplayLoginForm(!displayLoginForm);
    setDisplayRegisterForm(!displayRegisterForm);
  };

  return (
    <View
      show={show}
      className="d-flex flex-column align-items-center justify-content-center"
    >
     {displayLoginForm &&
        <Card>
          <p> Iniciar Sesión </p>
          <TextField
            label="Email"
            type="email"
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={passField}
            onChange={(e) => setPassField(e.target.value)}
          />
          <div className="w-100 mt-2 d-flex justify-content-end">
            <Button> Entrar </Button>
          </div>
        </Card>
     }

      {displayRegisterForm &&
        <Card>
          <p> Crear Cuenta </p>
          <TextField
            label="Nombre"
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={passField}
            onChange={(e) => setPassField(e.target.value)}
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={rpassField}
            onChange={(e) => setRPassField(e.target.value)}
          />
          <div className="w-100 d-flex justify-content-end">
            <Button> Crear </Button>
          </div>
        </Card>
      }

      <Button 
        className="mt-1"
        onClick={toggleForms}
      >
        {displayLoginForm ? "Crear Cuenta" : "Iniciar Sesión"}
      </Button>
    </View>
  );
}