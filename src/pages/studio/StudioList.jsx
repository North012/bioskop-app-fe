import { Link } from "react-router-dom";
import useStudios from "../../hooks/useStudios";

function StudioList() {
    const { studios, loading, error, deleteStudio } = useStudios();

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await deleteStudio(id);
                alert("data berhasil dihapus");
            } catch {
                alert("Gagal hapus data");
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Studio List</h2>
            <Link to="/studios/create" className="hover:underline">Tambah Data</Link>
            <table className="border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Studio</th>
                        <th className="border p-2">Tempat</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {studios.map((studio) => (
                        <tr key={studio.id}>
                            <td className="border p-2">{studio.id}</td>
                            <td className="border p-2">{studio.name}</td>
                            <td className="border p-2">{studio.theater.name}</td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/studios/${studio.id}/show`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        Show
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/seats/${studio.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        Edit Kursi
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/seats/${studio.id}/create`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        Tambah Kursi
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/studios/${studio.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        Edit
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(studio.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudioList;