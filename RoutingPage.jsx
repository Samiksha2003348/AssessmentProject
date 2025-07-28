import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../AssessmentPages/LoginForm";
import SignupForm from "../AssessmentPages/SignupForm";
import Dashboard from "../AssessmentPages/Dashboard";

export let routes=createBrowserRouter([
    {
        path:'/',
        element :<LoginForm/>
    },
    {
        path:'/signup',
        element:<SignupForm/>
    },
     {
        path:'/dashboard',
        element:<Dashboard/>
    }
])