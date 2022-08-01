import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

  return (
    <nav className="w-full bg-primary py-5 px-3 box-border">
        <ul className="flex my-0 mx-auto max-w-5xl items-center">
            <li className="mr-auto font-bold text-xl tracking-wider"><Link to="/">NAVBAR</Link></li>
            {user && (
            <>
            <li>Welcome, <span className="font-bold">{user.displayName.toUpperCase()}</span></li>
            <li><button className="ml-3 button-base" onClick={logout}>Logout</button></li>
            </>
            )}
            {!user && (
            <>
            <li className="ml-4 text-gray-700"><Link to="/login">Login</Link></li>
            <li className="ml-4 text-gray-700"><Link to="/signup">Signup</Link></li>
            </>
            )}
        </ul>
    </nav>
  )
}