import { useEffect, useState } from 'react'
import './App.css'
import '/node_modules/bootstrap/dist/js/bootstrap.js'
import '/node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/styles/assets/Assets.css'
import './assets/styles/sidebar/Sidebar.css'
import './assets/styles/header/Header.css'
import './assets/styles/user_login/UserLogin.css'
import './assets/styles/data_table_actions/Action.css'
import './assets/styles/master/Customer.css'
import 'react-toastify/dist/ReactToastify.css'
import { useRoutes } from 'react-router-dom'
import Routes from './routes/Route'

function App() {

  const [collapsed, setCollapsed] = useState(false)

  function RouteLayout({ path }) {
    const element = useRoutes(path);
    return element;
  }

  useEffect(() => {
  
    const langKey = localStorage.getItem('lang_key');
    document.documentElement.setAttribute('lang', langKey === 'ar' ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', langKey === 'ar' ? 'rtl' : 'ltr');

  }, []);

  return (
    <div className="App">

      <RouteLayout path={Routes()} />


    </div>
  );
}

export default App;
