import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./component/Auth";
import Login from "./component/Login";
import theme from "./themeing";
import Dashboard from "./component/Dashboard";
import store from './store'
import {Provider} from "react-redux";
function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>

            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={
                        <Auth>
                            <Provider store={store}>
                            <Dashboard/>
                            </Provider>
                        </Auth>
                    }/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    </div>
  );
}

export default App;
