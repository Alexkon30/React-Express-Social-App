import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { useAuth } from './hooks/auth.hook'
import GlobalContext from './context/GlobalContext'
import Routes from './routes'
import './styles/App.css'
import Navbar from './components/Navbar'
import MainStore from './store/mainStore.js'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  // const { login, logout, token } = useAuth();

  return (
    <GlobalContext.Provider value={{
      MainStore,
      FormStore: MainStore.FormStore,
      ClientStore: MainStore.ClientStore,
      UserStore: MainStore.UserStore
    }}>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </GlobalContext.Provider >
  );
})

export default App;
