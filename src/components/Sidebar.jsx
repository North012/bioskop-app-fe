import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Sidebar() {
    const { logout, loading } = useLogin();

    return (
        <div className="sidebar" style={{ width: "200px", float: "left", background: "#f0f0f0", height: "100vh", padding: "1rem" }}>
            <h3>Dashboard</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                    Admin
                </li>
                <li>
                    <Link to="/dashboard/admin" className="hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/users" className="hover:underline">Daftar User</Link>
                </li>
                <li>
                    <Link to="/films" className="hover:underline">Daftar Film</Link>
                </li>
                <li>
                    <Link to="/locations" className="hover:underline">Daftar Lokasi</Link>
                </li>
                <li>
                    <Link to="/theaters" className="hover:underline">Daftar Bioskop</Link>
                </li>
                <li>
                    <Link to="/studios" className="hover:underline">Daftar Studio</Link>
                </li>
                <li>
                    <Link to="/schedules" className="hover:underline">Daftar Schedule</Link>
                </li>
                <br />
                <li>
                    Customer
                </li>
                <li>
                    <Link to="/dashboard/customer" className="hover:underline">Home</Link>
                </li>
                <li>
                    <button onClick={logout} disabled={loading}>
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;