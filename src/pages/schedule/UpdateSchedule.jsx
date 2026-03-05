import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSchedules from "../../hooks/useSchedules";
import useFilms from "../../hooks/useFilms";
import useStudios from "../../hooks/useStudios";
import api from "../../api/axios";

function UpdateSchedule() {
    const { id } = useParams();
    const { updateSchedule, loading, error, deleteSchedule } = useSchedules();
    const { films, loading: loadingFilm } = useFilms();
    const { studios } = useStudios();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        film_id: "",
        studio_id: "",
        date: "",
        time: "",
        price: "",
    });

    const handleDelete = async () => {
        if (window.confirm("Apakah yakin ingin menghapus data ini?")) {
            try {
                await deleteSchedule(id); // pastikan deleteSchedule menerima id
                alert("Data berhasil dihapus!");
                navigate(-1); // kembali ke halaman sebelumnya
            } catch (err) {
                console.error("Gagal hapus:", err);
                alert("Gagal hapus data!");
            }
        }
    };


    useEffect(() => {
        api.get(`schedule/show/${id}`).then((res) => {
            const u = res.data.data;

            let formattedTime = u.time;
            if (formattedTime.includes(".")) {
                formattedTime = formattedTime.replace(".", ":"); // 09.25 → 09:25
            }
            // jika format lengkap "HH:MM:SS", ambil 5 karakter pertama
            if (formattedTime.length > 5) {
                formattedTime = formattedTime; // "09:25:00" → "09:25"
            }

            setForm({
                film_id: u.film_id,
                studio_id: u.studio_id,
                date: u.date,
                time: formattedTime,
                price: u.price,
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
            await updateSchedule(id, dataToSend);
            alert("Data berhasil diubah!");
            navigate(-1);
        } catch (err) {
            console.error("Update gagal:", err);
            alert("Gagal Update Data!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Update Data Schedule</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-2">
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

                <br />
                <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Update"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                >
                    Kembali
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                >
                    Hapus
                </button>
            </form>
        </div>
    )
}

export default UpdateSchedule;