import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import api from "../../api/axios";

function UpdateUser() {
    const { id } = useParams();
    const { updateUser, loading, error } = useUsers();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        role: "customer",
    });

    useEffect(() => {
        // ambil data user
        api.get(`users/${id}`).then((res) => {
            const u = res.data.data;
            setForm({
                name: u.name,
                email: u.email,
                password: "",
                phone_number: u.phone_number,
                role: u.role,
            });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...form };
            if (!dataToSend.password) {
                delete dataToSend.password;
            }

            await updateUser(id, dataToSend);
            alert("User berhasil diupdate!");
            navigate(-1);
            
        } catch (err) {
            console.error("Update gagal:", err);
            alert("Gagal update user! Cek console untuk detail.");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Update User</h1>
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
                    placeholder="Password (kosongkan jika tidak diubah)"
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
                    <option value="admin">Admin</option>
                    <option value="adminLocation">Admin Location</option>
                    <option value="adminEvent">Admin Event</option>
                    <option value="customer">Customer</option>
                </select>
                <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Update"}
                </button>
            </form>
        </div>
    );
}

export default UpdateUser;