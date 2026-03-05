import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // <-- ambil useParams
import useSchedules from "../../hooks/useSchedules";
import useFilms from "../../hooks/useFilms";
import useStudios from "../../hooks/useStudios";

function CreateSchedule() {
    const { id } = useParams(); // <-- id studio dari URL
    const { createSchedule, loading, error } = useSchedules();
    const { films, loading: loadingFilm } = useFilms();
    const { studios } = useStudios();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        film_id: "",
        studio_id: id || "",   // <-- set langsung dari URL
        date: "",
        time: "",
        price: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.film_id || !form.date || !form.time || !form.price) {
            alert("Semua field harus diisi!");
            return;
        }

        try {
            const dataToSend = {
                film_id: form.film_id,
                studio_id: form.studio_id,
                date: form.date,
                time: form.time, // <-- samakan dengan backend
                price: form.price,
            };

            await createSchedule(dataToSend);
            alert("Berhasil menambahkan schedule!");
            navigate(-1);
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Gagal menyimpan schedule!");
        }
    };



    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tambah Schedule</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Nama studio ditampilkan berdasarkan studio_id */}
                <h2 className="font-semibold">
                    {studios.find(st => st.id === parseInt(form.studio_id))?.name}
                </h2>

                <input
                    type="hidden"
                    name="studio_id"
                    value={form.studio_id}
                />

                {/* Film (dropdown) */}
                <select
                    name="film_id"
                    value={form.film_id}
                    onChange={handleChange}
                    className="border p-2 block w-64 rounded"
                    disabled={loadingFilm}
                >
                    <option value="">Pilih Film</option>
                    {films.map((film) => (
                        <option key={film.id} value={film.id}>
                            {film.title}
                        </option>
                    ))}
                </select>

                {/* Date */}
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border p-2 block w-64 rounded"
                />

                {/* Time */}
                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="border p-2 block w-64 rounded"
                />

                {/* Price */}
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Harga tiket"
                    className="border p-2 block w-64 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default CreateSchedule;
