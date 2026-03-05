import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";

function UserList() {
  const { users, loading, error, deleteUser } = useUsers(); // ✅ ambil users dari object

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message || error}</p>;

  const handleDelete = async (id) => {
    if (window.confirm("Hapus data user ini?")) {
      try {
        await deleteUser(id);
        alert("User berhasil dihapus!");

      } catch {
        alert("Gagal hapus user!");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <Link to="/users/create" className="hover:underline">Tambah User</Link>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phone_number}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                {/* Tombol Edit */}
                <Link
                  to={`/users/${user.id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                {/* Tombol Delete */}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
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

export default UserList;
