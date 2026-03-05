import { useEffect, useState } from "react";

function DashboardAdmin() {
    const [ user, setUser] = useState(null);;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: "0.3rem" }}>
                Dashboard Admin
            </h1>
            <h2 style={{ marginTop: 0 }}>
                Selamat datang, {user ? user.name : "Pengguna"}!
            </h2>
            <p>Selamat datang di panel admin. Kamu bisa mengelola data pengguna, film, dan jadwal di sini.</p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
                    <h4>Total Pengguna</h4>
                    <p>120</p>
                </div>

                <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
                    <h4>Total Film</h4>
                    <p>45</p>
                </div>

                <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
                    <h4>Total Pemesanan</h4>
                    <p>250</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;
