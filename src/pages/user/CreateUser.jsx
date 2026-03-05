import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";

function CreateUser() {
    const { createUser, loading, error } = useUsers();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(form);
            alert("User berhasil ditambahkan!");
            navigate(-1);
        } catch {
            alert("Gagal menambahkan user");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tambah User</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama"
                    className="border p-1 block w-64"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-1 block w-64"
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border p-1 block w-64"
                />
                <input
                    type="number"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border p-1 block w-64"
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border p-1 block w-64"
                >
                    <option value="">-- Pilih role --</option>
                    <option value="admin">admin</option>
                    <option value="adminLocation">adminLocation</option>
                    <option value="adminEvent">adminEvent</option>
                    <option value="customer">customer</option>
                </select>
                
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default CreateUser;
