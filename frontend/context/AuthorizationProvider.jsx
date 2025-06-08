import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { userLoginAPI } from '../services/usersAPI'
import { useEffect } from 'react'


const AuthorizationContext = createContext()

export const AuthorizationProvider = ({children}) => {
      const navigate = useNavigate()
      const [loading, setLoading] = useState(true)
      const [user, setUser] = useState(null)

      useEffect(() => {
      const token = localStorage.getItem("token")

      if (!token) {
            setLoading(false)
            return
      }

      try {
            const { id, email, status, exp } = jwtDecode(token)
            const time = Date.now() / 1000

            if (exp < time) {
                  localStorage.removeItem("token")
                  setUser(null)
            }
            else {
                  setUser({ id, email, status })
            }

      }
      catch (error) {
            localStorage.removeItem("token")
            setUser(null)
      }
      finally {
            setLoading(false)
      }
      }, [])


      async function login(email, password) {

                  const res = await userLoginAPI(email, password)

                  if (res.status === 200) {
                        const { token } = res.data
                        localStorage.setItem("token", token)

                        const { id, email, status } = jwtDecode(token)
                        setUser({ id, email, status })
                        navigate("/home", {replace: true})
                  }
                  else {
                        alert(res.message)
                        localStorage.removeItem("token")
                  }
      }

      function logout() {
            localStorage.removeItem("token")
            setUser(null)
      }

  return (
    <AuthorizationContext.Provider value={{user, loading, login, logout}}> 
      {children}
    </AuthorizationContext.Provider>
  )
}

export { AuthorizationContext }
