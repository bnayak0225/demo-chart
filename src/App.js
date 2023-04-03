import './App.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./component/Auth";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import store from './store'
import {Provider} from "react-redux";
function App() {
  return (

    <Provider store={store}>
        <Routes>
            <Route path={"/"} element={
                <Auth>
                    <Dashboard/>
                </Auth>
            }/>
            <Route path={"/login"} element={<Login/>}/>
        </Routes>
    </Provider>
  );
}

export default App;
