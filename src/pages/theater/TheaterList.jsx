import { Link } from "react-router-dom";
import useTheaters from "../../hooks/useTheater";

function TheaterList() {
    const { theaters, loading, error, deleteTheater } = useTheaters();

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await deleteTheater(id);
                alert("data berhasil dihapus!");
            } catch {
                alert("Gagal hapus data");
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Location List</h2>
            <Link to="/theaters/create" className="hover:underline">Tambah data</Link>
            <table className="border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Lokasi</th>
                        <th className="border p-2">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {theaters.map((theater) => (
                        <tr key={theater.id}>
                            <td className="border p-2">{theater.id}</td>
                            <td className="border p-2">{theater.location.name}</td>
                            <td className="border p-2">{theater.name}</td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/theaters/${theater.id}/show`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Show
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/theaters/${theater.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Edit
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(theater.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TheaterList;