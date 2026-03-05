import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudios from "../../hooks/useStudios";
import useTheaters from "../../hooks/useTheater";

function CreateStudio() {
    const { createStudio, loading, error } = useStudios();
    const { theaters, loading: loadingTheater } = useTheaters();
    const [form, setForm] = useState({
        name: "",
        seat_map: "",
        theater_id: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createStudio(form);
            console.log("Res dari createStudio:", res);
            const newStudioId = res.data.id;

            alert("Berhasil menambahkan data");
            navigate(`/seats/${newStudioId}/create`)
        } catch (err) {
            alert("Gagal menyimpan data!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tambah Data Studio</h1>
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
                    <option disabled value="">Pilih Bioskop</option>
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

                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default CreateStudio;