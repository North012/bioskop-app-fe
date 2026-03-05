import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFilms from "../../hooks/useFilms";

function CreateFilm() {
    const { createFilm, loading, error } = useFilms();
    const [form, setForm] = useState({ title: "", description: "", date: "", duration: "", category: "", trailer: "", status:"", image: null });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setForm({
            ...form,
            [name]: type === "file" ? files[0] : value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            await createFilm(formData);
            alert("Film berhasil ditambahkan!");
            navigate(-1);

        } catch {
            alert("Gagal menambahkan film!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tambah Film</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Judul"
                    className="border p-1 block w-64"
                />
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Deskripsi"
                    className="border p-1 block w-64"
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="Tanggal Tayang"
                    className="border p-1 block w-64"
                />
                <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Durasi Tayang"
                    className="border p-1 block w-64"
                />
                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Kategori / Tema"
                    className="border p-1 block w-64"
                />
                <input
                    type="text"
                    name="trailer"
                    value={form.trailer}
                    onChange={handleChange}
                    placeholder="Link Youtobe"
                    className="border p-1 block w-64"
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-1 block w-64"
                >
                    <option value="">-- Pilih Status Film --</option>
                    <option value="available">Tayang</option>
                    <option value="unavailable">Tidak Tayang</option>
                </select>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    placeholder="select"
                    className="border p-1 block w-64"
                />

                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default CreateFilm;