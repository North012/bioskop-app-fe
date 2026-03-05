import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTheaters from "../../hooks/useTheater";

function ShowTheater() {
    const { id } = useParams();
    const { showTheater, loading, error } = useTheaters();
    const [theater, setTheater] = useState(null);

    useEffect(() => {
        const getTheater = async () => {
            try {
                const data = await showTheater(id);
                setTheater(data);
            } catch(err) {
                console.error("Gagal mengambil data:", err);
            }
        };
        getTheater();
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="p-4">
            {theater ? (
                <div className="max-w-md mx-auto bg-white shadow rounded p-4">
                    <p className="mb-4">{theater.name}</p>
                    <p className="mb-4">{theater.location.name}</p>
                    <p className="mb-4">{theater.address}</p>
                </div>
            ) : (
                <p>Theater tidak ditemukan</p>
            )}
        </div>
    )
}

export default ShowTheater;