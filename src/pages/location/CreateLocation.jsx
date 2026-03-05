import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocations from "../../hooks/useLocations";

function CreateLocation() {
    const { createLocation, loading, error } = useLocations();
    const [form, setForm] = useState({
        name: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createLocation(form);
            alert("Data berhasil ditambahkan!");
            navigate(-1);
        } catch {
            alert("Gagal menambahkan data!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tambah Lokasi</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Wilayah / Kota"
                    className="border p-1 block w-64"
                />
                
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default CreateLocation;