import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSeats from "../../hooks/useSeats";
import useStudios from "../../hooks/useStudios";

function CreateSeat () {
    const { createSeat, loading, error } = useSeats();
    const { studios } = useStudios();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        studio_id: id || "",
        rows: "",
        columns: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.rows || !form.columns) {
            alert("Rows dan Columns wajib diisi!");
            return;
        }

        try {
            await createSeat(form);
            alert("Berhasil membuat map bioskop!");
            navigate(`/studios`);
        } catch (err) {
            alert("Gagal menyimpan map bioskop!");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Atur Seat</h1>
            <p>hitung tangga seperti seat</p>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <h2 className="font-semibold">
                    {studios.find(st => st.id === parseInt(form.studio_id))?.name}
                </h2>

                <input 
                    type="hidden"
                    name="studio_id"
                    value={form.studio_id}
                 />

                <input 
                    type="number"
                    name="rows"
                    value={form.rows}
                    onChange={handleChange}
                    placeholder="Berapa baris?"
                    className="border p-2 block w-64 rounded"
                 />

                <input 
                    type="number"
                    name="columns"
                    value={form.columns}
                    onChange={handleChange}
                    placeholder="Banyak kursi dalam baris"
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

export default CreateSeat;