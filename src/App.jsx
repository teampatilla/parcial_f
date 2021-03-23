import React from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import Products from './components/Products'
import Login from './components/Login'
import Submit from './components/Submit'
import Category from './components/Category'
import User from './components/User'
import Permissions from './components/Permissions'
import Rols from './components/Rols'
import './custom.css'


const App = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Submit" component={Submit} />
      <Route path="/Categories" component={Category} />
      <Route path="/Products" component={Products} />
      <Route path="/User" component={User} />
      <Route path="/Permissions" component={Permissions} />
      <Route path="/Rols" component={Rols} />
    </div>
  )
}

export default App