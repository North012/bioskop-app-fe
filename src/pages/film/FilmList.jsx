import { Link } from "react-router-dom";
import useFilms from "../../hooks/useFilms";
import UpdateFilm from "./UpdateFilm";

function FilmList() {
    const { films, loading, error, deleteFilm, updateStatusFilm } = useFilms();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>

    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await deleteFilm(id);
                alert("Data berhasil dihapus!");
            } catch {
                alert("Gagal hapus data!");
            }
        }
    };

    const handleUpdateStatus = async (id) => {
        if (window.confirm("Ubah status film menjadi tidak tayang?")) {
            try {
                await updateStatusFilm(id);
                alert("Berhasil update status film!");
            } catch {
                alert("Gagal update status film!");
            }
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Film List</h2>
            <Link to="/films/create" className="hover:underline">Tambah Data</Link>
            <table className="border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Judul</th>
                        <th className="border p-2">Durasi Tayang</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film) => (
                        <tr key={film.id}>
                            <td className="border p-2">{film.id}</td>
                            <td className="border p-2">{film.title}</td>
                            <td className="border p-2">{film.duration}</td>
                            <td className="border p-2">
                                {film?.status === 'available' ? 'tayang' : film?.status === 'unavailable' ? 'tidak tayang' : '-'}
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/films/${film.id}/show`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Show
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/films/${film.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Edit
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(film.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleUpdateStatus(film.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                    Update Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FilmList;