import Home from './Components/Home'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import Profile from './Components/Profile'
import SignUp from './Components/SignUp'
import CreateQuote from './Components/CreateQuote'
export const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/create",
        element: <CreateQuote />

    },
    {
        path: "/login",
        element: <Login />

    },
    {
        path: "/signup",
        element: <SignUp />

    },
    {
        path: "/profile",
        element: <Profile />

    },
]