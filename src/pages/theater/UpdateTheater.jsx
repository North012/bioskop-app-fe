import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTheaters from "../../hooks/useTheater";
import useLocations from "../../hooks/useLocations";
import api from "../../api/axios";

function UpdateTheater() {
    const { id } = useParams();
    const { updateTheater, loading, error } = useTheaters();
    const { locations, loading: loadingLocation } = useLocations();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        location_id: "",
        name: "",
        address: "",
    });

    useEffect(() => {
        api.get(`theater/${id}`).then((res) => {
            const u = res.data.data;
            setForm({
                location_id: u.location_id,
                name: u.name,
                address: u.address,
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
        try{
            const dataToSend = { ...form };
            await updateTheater(id, dataToSend);
            alert("Data berhasil diupdate!");
            navigate(-1);
        } catch (err) {
            console.error("Update data error:", err);
            alert("Gagal update data!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Update Data Theater</h1>
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
                    {form.location_id === "" && (
                        <option disabled value="">
                            Pilih Lokasi
                        </option>
                    )}
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

                <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Update"}
                </button>
            </form>
        </div>
    )
}

export default UpdateTheater;