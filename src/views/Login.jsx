
import { useState } from "react";
import {
  View,
  TextField,
  CircularLoading,
  Button,
  Card,
  Alert,
} from "ui"; 
import http from "utils/http"


/**
 * View component 
 */
export default function LoginView({ show }) {
    // form values
    const [userField, setUserField] = useState("");
    const [passField, setPassField] = useState(""); 
    
    const [alertShown, setAlertShown] = useState(false); 
    const [sendingLogin, setSendingLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginMessage, setLoginMessage] = useState("Nada a pasado");
    
    
    /**
     * show alert
     */
    const showAlert = (time) => {
        setAlertShown(true);
        setTimeout(() => setAlertShown(false), time || 2000);
    }
    
    /**
     * LogIn the user
     */
    const sendLoginData = () => {
        setSendingLogin(true);
        
        http.post({
            url: "/auth/login",
            body: {
                username: userField,
                password: passField,
            }
        })
        .then(data => setTimeout(() => {
            setSendingLogin(false);
            if (data.status) {
                setLoginError(false);
                setLoginMessage("Autenticación realizada correctamente");
            }
            else {
                setLoginError(data.data.message);
                setLoginMessage(data.data.message);
            }
            
            showAlert();
        }, 5000));
    }


  return (
    <View
      show={show}
      className="d-flex flex-column justify-content-center align-items-center"
    >
        <Card className="mx-2 px-5">
          <p className="fs-3"> Iniciar Sesión </p>
          
          <TextField
            label="Usuario"
            value={userField}
            disabled={sendingLogin}
            error={
                // error
                !sendingLogin && 
                ["WRONG_USER"].includes(loginError)
            }
            onChange={(e) => setUserField(e.target.value)}
          />
          
          <TextField
            label="Contraseña"
            type="password"
            disabled={sendingLogin}
            error={
                // error
                !sendingLogin &&
                ["WRONG_USER"].includes(loginError)
            }
            value={passField}
            onChange={(e) => setPassField(e.target.value)}
          />
          
          
          {/** 
            Submit Button with loading
           **/}
          <div className="w-100 mt-2 d-flex justify-content-end">
            <Button 
                type="submit"
                disabled={sendingLogin}
                onClick={() => sendLoginData()}
            > 
              Acceder 
              {sendingLogin && 
                <CircularLoading
                  color="inherit" 
                  className="ms-1" 
                  size="1rem"
                />
              }
            </Button>
          </div>
          
        </Card>
        
        <Alert 
            className="m-3"
            show={alertShown} 
            type={loginError ? "error" : "success"}
        > {loginMessage} </Alert>
    </View>
  );
}