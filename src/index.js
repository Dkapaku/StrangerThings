import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/Homepage/HomePage.js'
import Registration from './components/Register.js'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import './index.css'
import Login from './components/Login.js'
import {useState} from 'react'
import LogOutButton from './components/LogOut.js'
import ProfilePage from './components/Profile/Profile.js';
import ProductForm from './components/ProductForm.js'
const App = () => {
const [LogIn,setLogIn]=useState(false);
    return(
    <div>
        <nav>
            <Link to="/">HomePage</Link>
            {
                LogIn ?  "": (            
            <section>
            <Link to='/register'>Register/</Link>
            <Link to="/login">Login</Link>
            </section>
            )
}
            <Link to="/logout">LogOut</Link>
            <Link to="/newform">Post</Link>
            <Link to='/profile'>Profile</Link>
        </nav>
        <Routes>
            <Route path ='/' element = {<HomePage LogIn={LogIn} setLogIn={setLogIn}/>} />
            <Route path='/register' element = {<Registration />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/logout' element= {<LogOutButton />}/>
            <Route path='/newform' element= {<ProductForm />}/>
            <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        
    </div>)
}

ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
    ,document.getElementById('app')
)