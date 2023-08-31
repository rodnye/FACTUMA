
import { createContext, useState } from 'react'
import HomeView from './views/Home/Home'
import LoginView from './views/Login/Login'


// Application 
export default function App () {
    const [currentViewName, setCurrentViewName] = useState("LoginView"); 
     
    return (
      <div>
        <LoginView show={currentViewName == "LoginView"}/>
        <HomeView show={currentViewName == "HomeView"}/> 
      </div>
    )
}