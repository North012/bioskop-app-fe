import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFilms from "../../hooks/useFilms";

function ShowFilm() {
    const { id } = useParams();
    const { showFilm, loading, error } = useFilms();
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const getFilm = async () => {
            try {
                const data = await showFilm(id);
                setFilm(data);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            }
        };

        getFilm();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            {film ? (
                <div className="max-w-md mx-auto bg-white shadow rounded p-4">
                    <h1 className="text-2xl font-bold mb-2">{film.title}</h1>
                    {film.image && (
                        <img
                            src={film.image}
                            alt={film.title}
                            style={{ width: "250px", height: "auto" }}
                            className="rounded"
                        />
                    )}
                    <p className="mb-4">{film.date} || {film.duration} || {film.category} || {film.status}</p>
                    <p className="mb-4">{film.trailer}</p>
                    <p className="mb-4">{film.description}</p>
                </div>
            ) : (
                <p>Film tidak ditemukan</p>
            )}
        </div>
    );
}

export default ShowFilm;