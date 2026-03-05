import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "1rem" }}>
                <p>
                    {user?.role === "admin" ? "Admin"
                        : user?.role === "adminLocation" ? "Admin Location"
                            : user?.role === "adminEvent" ? "Admin Event"
                                : user?.role === "customer" ? "Customer"
                                    : "Dashboard"}
                </p>
                <Outlet /> {/* tempat untuk render halaman sesuai route */}
            </div>
        </div>
    );
}

export default Dashboard;