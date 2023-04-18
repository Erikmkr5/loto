import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ROUTES} from "../Shared/enum";
import {About} from "../Pages/About";
import {MainView} from "../Pages/MainView";
import {AuthPage} from "../Pages/AuthPage";


export default function SimpleRoutes(){
    return(
        <Router>
            <Routes>
                <Route path={''} element={<MainView/>} />
                <Route path={ROUTES.ABOUT_PAGE} element={<About/>} />
                <Route path={ROUTES.AUTH_PAGE} element={<AuthPage/>} />
                {/*<Route path={ROUTES.REG_PAGE} element={<RegistrationPage/>} />*/}
                {/*<Route component={NotFound} />*/}
            </Routes>
        </Router>
    )
}
