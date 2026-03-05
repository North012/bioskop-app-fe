import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStudios from "../../hooks/useStudios";
import useTheaters from "../../hooks/useTheater";
import api from "../../api/axios";

function UpdateStudio() {
    const { id } = useParams();
    const { updateStudio, loading, error } = useStudios();
    const { theaters, loading: loadingTheater } = useTheaters();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        seat_map: "",
        theater_id: "",
    });

    useEffect(() => {
        api.get(`studio/${id}`).then((res) => {
            const u = res.data.data;
            setForm({
                name: u.name,
                seat_map: u.seat_map,
                theater_id: u.theater_id,
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
            await updateStudio(id, dataToSend);
            alert("Data berhasil diupdate!");
            navigate(-1);
        } catch (err) {
            console.error("Update data error:", err);
            alert("Gagal update data!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Update Data Studio</h1>
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
                    name="seat_map"
                    value={form.seat_map}
                    onChange={handleChange}
                    placeholder="Map Bioskop"
                    className="border p-1 block w-64"
                />
                <select
                    name="theater_id"
                    value={form.theater_id}
                    onChange={handleChange}
                    className="border p-1 block w-64"
                >
                    {form.theater_id === "" && (
                        <option disabled value="">
                            Pilih Bioskop
                        </option>
                    )}
                    {loadingTheater ? (
                        <option disabled>Loading...</option>
                    ) : (
                        theaters.map((theater) => (
                            <option key={theater.id} value={theater.id}>
                                {theater.name}
                            </option>
                        ))
                    )}
                </select>

                <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Update"}
                </button>
            </form>
        </div>
    );
}

export default UpdateStudio;