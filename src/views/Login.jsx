import { useState } from "react";
import {
    View,
    TextField,
    SelectField,
    CircularLoading,
    Button,
    Card,
    Alert,
} from "ui";
import http from "utils/http";


export default function LoginView({ show }) {
    // Form values
    const [userField, setUserField] = useState("");
    const [passField, setPassField] = useState("");
    const [cashierField, setCashierField] = useState("");
    const [cashierList, setCashierList] = useState([]);
    
    // Form status
    const [alertShown, setAlertShown] = useState(false);
    const [loginSending, setLoginSending] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginMessage, setLoginMessage] = useState("Nothing has happened");
    
    
    // Function to show alert
    const showAlert = (time) => {
        setAlertShown(true);
        setTimeout(() => setAlertShown(false), time || 2000);
    }
    
    
    // Function to get cashier list
    const requestCashierList = () => {
        http.get("/cashierList").then(data => {
            setCashierList(data.data);
        })
    }
    requestCashierList();
    
    
    // Function to log in the user
    const sendLoginData = () => {
        setLoginSending(true);

        http.post({
            url: "/auth/login",
            body: {
                username: userField,
                password: passField,
                cashier: cashierField,
            }
        })
        .then(data => setTimeout(() => {
            setLoginSending(false);
            if (data.status) {
                setLoginError(false);
                setLoginMessage("Autenticación existosa");
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
                    disabled={loginSending}
                    error={
                        !loginSending &&
                        ["WRONG_USER"].includes(loginError)
                    }
                    onChange={(e) => setUserField(e.target.value)}
                />
                
                
                <TextField
                    label="Contraseña"
                    type="password"
                    disabled={loginSending}
                    error={
                        !loginSending &&
                        ["WRONG_USER"].includes(loginError)
                    }
                    value={passField}
                    onChange={(e) => setPassField(e.target.value)}
                />
                
                
                <SelectField
                    label="Cajero"
                    disabled={loginSending}
                    value={cashierField}
                    onChange={(e) => setCashierField(e.target.value)}
                    list={cashierList}
                />
                
                
                <div className="w-100 mt-2 d-flex justify-content-end">
                    <Button
                        type="submit"
                        disabled={loginSending}
                        onClick={() => sendLoginData()}
                    >
                        Acceder
                        {loginSending &&
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