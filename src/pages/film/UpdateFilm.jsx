import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFilms from "../../hooks/useFilms";
import api from "../../api/axios";

function UpdateFilm() {
    const { id } = useParams();
    const [oldImage, setOldImage] = useState(null);
    const { updateFilm, loading, error } = useFilms();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        duration: "",
        category: "",
        trailer: "",
        status: "available",
        image: null
    });

    useEffect(() => {
        api.get(`film/${id}`).then((res) => {
            const u = res.data.data;
            setForm({
                title: u.title,
                description: u.description,
                date: u.date,
                duration: u.duration,
                category: u.category,
                trailer: u.trailer,
                status: u.status,
                image: null, // hanya file baru
            });
            setOldImage(u.image); // simpan url/filename lama
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
            const formData = new FormData();
            for (const key in form) {
                if (form[key] !== null && form[key] !== "") {
                    formData.append(key, form[key]);
                }
            }


            await updateFilm(id, formData);
            alert("Data berhasil diupdate!");
            navigate(-1);
        } catch (err) {
            console.error("Update gagal:", err);
            alert("Gagal update film! Cek console dulu yak");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Update Film</h1>
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
                    placeholder="Kategori Film"
                    className="border p-1 block w-64"
                />
                <input
                    type="text"
                    name="trailer"
                    value={form.trailer}
                    onChange={handleChange}
                    placeholder="Kategori Film"
                    className="border p-1 block w-64"
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-1 block w-64"
                >
                    <option value="available">Tayang</option>
                    <option value="unavailable">Tidak Tayang</option>
                </select>

                <input
                    type="file"
                    name="image"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="border p-1 block w-64"
                />
                <br /> <br />
                {form.image ? (
                    <img src={URL.createObjectURL(form.image)} alt="preview" style={{ width: "250px", height: "auto" }} className="rounded" />
                ) : oldImage ? (
                    <img src={oldImage} alt="old" style={{ width: "250px", height: "auto" }} className="rounded" />
                ) : null}
                <br />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}

export default UpdateFilm;