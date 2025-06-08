import { useState, useContext } from 'react'
import { LoginForm } from './loginForm'
import { AuthorizationContext } from '../../context/authorizationProvider'
import { RegisterForm } from './RegisterForm'
import { userRegisterAPI } from '../../services/usersAPI'

export const LoginPage = () => {
      const [pageState, setPageState] = useState("login")
      const [name, setName] = useState("")
      const [last_name, setLastName] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const {login} = useContext(AuthorizationContext)


      async function submitLogin(event) {
            event.preventDefault()
            try {
                  const res = await login(email, password)    
            }
            catch (error) {
                  console.log("Error LoginPage/submitLogin",error )
                  alert(res.message)
            }

      }

      async function submitRegister(event) {
            event.preventDefault()
            try {
                  const res = await userRegisterAPI(name, last_name, email, status, password)
                  if (res.success){
                        setPageState("login")
                  }
                  else {
                        alert(`${res.message}`)
                  }
            }
            catch (error)
            {
                  console.log("Error creating user submitRegister/LoginPage", error.response.data.message)
            }
      }

      function clear() {
            setName("")
            setLastName("")
            setEmail("")
            setPassword("")
      }

      



  return (
    <div>loginPage
      {pageState === "login" ? (<LoginForm      email={email} 
                                                password={password} 
                                                setEmail={setEmail} 
                                                setPassword={setPassword} 
                                                submitLogin={submitLogin} 
                                                setPageState={setPageState}/>
                        ) : (<RegisterForm      name={name}
                                                last_name={last_name}
                                                email={email} 
                                                password={password}
                                                setName={setName}
                                                setLastName={setLastName}
                                                setEmail={setEmail} 
                                                setPassword={setPassword} 
                                                submitRegister={submitRegister} 
                                                setPageState={setPageState}
                                                clear={clear}
                                                />)} 
      
    </div>
  )
}
