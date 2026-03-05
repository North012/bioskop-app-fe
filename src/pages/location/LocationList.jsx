import { Link } from "react-router-dom";
import useLocations from "../../hooks/useLocations";

function LocationList() {
    const { locations, loading, error, deleteLocation } = useLocations();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>

    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await deleteLocation(id);
                alert("Data berhasil dihapus!");
            } catch {
                alert("Gagal hapus data!");
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Location List</h2>
            <Link to="/locations/create" className="hover:underline">Tambah data</Link>
            <table className="border-collapse border border-gray-400 w-full">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location.id}>
                            <td className="border p-2">{location.id}</td>
                            <td className="border p-2">{location.name}</td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/locations/${location.id}/show`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Show
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    <Link to={`/locations/${location.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Edit
                                    </Link>
                                </button>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(location.id)} className="bg-red-600 text-white px-3 py-1 rounded">
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

export default LocationList;