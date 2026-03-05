import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheaters from "../../hooks/useTheater";
import useLocations from "../../hooks/useLocations";

function CreateTheater() {
    const { createTheater, loading, error } = useTheaters();
    const { locations, loading: loadingLocation } = useLocations();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        location_id: "",
        name: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTheater(form);
            alert("Berhasil menambahkan data!");
            navigate(-1);
        } catch (err) {
            alert("Gagal menyimpan data");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tambah Data Bioskop</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama Studio"
                    className="border p-1 block w-64"
                />
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Alamat Bioskop"
                    className="border p-1 block w-64"
                />
                <select
                    name="location_id"
                    value={form.location_id}
                    onChange={handleChange}
                    className="border p-1 block w-64"
                >
                    <option disabled value="">Pilih Lokasi</option>
                    {loadingLocation ? (
                        <option disabled>Loading...</option>
                    ) : (
                        locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.name}
                            </option>
                        ))
                    )}
                </select>

                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default CreateTheater;