import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useOrder from "../hooks/useOrder";

function DashboardCustomer() {
    const { film, loading, error, nowPlayingFilm } = useOrder();
    const [user, setUser] = useState(null);

    useEffect(() => {
        nowPlayingFilm();
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error.message || error}</p>;

    return (
        <div>
            <h1 style={{ marginTop: 0 }}>
                Selamat datang, {user ? user.name : "Pengguna"}!
            </h1>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginTop: "1rem"
                }}>
                    {film.map((flm) => (
                        <div
                            key={flm.id}
                            style={{
                                background: "#f0f0f0",
                                padding: "1rem",
                                borderRadius: "8px",
                                width: "250px"
                            }}
                        >
                            {flm.image && (
                                <img
                                    src={flm.image}
                                    alt={flm.title}
                                    className="rounded"
                                    style={{ width: "100%", height: "auto" }}
                                />
                            )}
                            <h4>{flm.title}</h4>
                            <button className="bg-red-600 text-white px-3 py-1 rounded">
                                <Link to={`/order/${flm.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Beli Tiket
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default DashboardCustomer;
