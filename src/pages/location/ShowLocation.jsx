import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLocations from "../../hooks/useLocations";

function ShowLocation() {
    const { id } = useParams();
    const { showLocationId, loading, error } = useLocations();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const data = await showLocationId(id);
                setLocation(data);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            }
        };
        getLocation();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="p-4">
            {location ? (
                <div className="max-w-md mx-auto bg-white shadow rounded p-4">
                    <p className="mb-4">{location.name}</p>
                    <p className="mb-4">{location.address}</p>
                </div>
            ) : (
                <p>Lokasi tidak ditemukan</p>
            )}
        </div>
    )
}

export default ShowLocation;