import axios from 'axios'

async function userAPI(request) {
      try {
            const res = await request()
            console.log(res)
            return { success: true, data: res.data, status: res.status }
      }
      catch (error) {
            console.log(error.response.data.message)
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "User API error"
            }
      }
}


async function userLoginAPI(email, password) {
      const result = await userAPI(() => axios.post("/api/users/login", {email, password}))
      return result
      
}

async function userRegisterAPI(name, last_name, email, status, password) {
      const result = await userAPI(() => axios.post("/api/users/create", {name, last_name, email, status, password}))
      return result
      
}

async function userDeleteAPI(userId) {
      const token = localStorage.getItem("token")
      const result = await userAPI(() => axios.delete(`/api/users/delete/${userId}`,
            {
                   headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
       ))
      return result
}

async function userDeleteFullAPI(userId) {
      const token = localStorage.getItem("token")
      const result = await userAPI(() => axios.delete(`/api/users/deletefull/${userId}`,
            {
                   headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
       ))
      return result
}

async function userGetAllAPI() {
            const token = localStorage.getItem("token")
      const result = await userAPI(() => axios.get("/api/users/getAll",
            {     
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))      
      return result   
}

async function restoreUserAPI(userId) {
      const token = localStorage.getItem("token")
      const result = await userAPI(() => axios.put("/api/users/restore", {userId},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

export { userLoginAPI, userRegisterAPI, userDeleteAPI, userGetAllAPI, userDeleteFullAPI, restoreUserAPI }