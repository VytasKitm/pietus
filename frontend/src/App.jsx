import { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './App.css'
import { AuthorizationContext } from '../context/AuthorizationProvider'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '../login/LoginPage'

function AuthUserRoute({children}) {
const { user, loading } = useContext(AuthorizationContext)
console.log(user)
console.log("AuthUserRoute running...", { user, loading });
if (loading) return null
if (!user) {
      return <Navigate to="/login" replace/>
}
return children
}

function AuthAdminRoute({children}) {
const { user } = useContext(AuthorizationContext)
if ( user.status !== "admin") {
      return <Navigate to="/home" replace/>
}
return children
}

function App() {


      return (
      <>
      <Routes>
			<Route path='/login' element={<LoginPage/>}/>
			<Route path='/' element={<AuthUserRoute><Layout/></AuthUserRoute>}>
				<Route index element={<Homepage/>}/>
				<Route path='home' element={<Homepage/>}/>
				<Route path='createAd' element={<AdvertPage/>}/>
				<Route path='favorites' element={<Favorites/>}/>
				<Route path='admin' element={<AuthAdminRoute><Admin/></AuthAdminRoute>}/>
			</Route>
		</Routes>  
      </>
      )    
}

export default App
