import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLocations from "../../hooks/useLocations";
import api from "../../api/axios";

function UpdateLocation() {
    const { id } = useParams();
    const { updateLocation, loading, error } = useLocations();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
    });

    useEffect(() => {
        api.get(`location/${id}`).then((res)=> {
            const u = res.data.data;
            setForm({
                name: u.name,
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
            await updateLocation(id, dataToSend);
            alert("Data berhasil diupdate!");
            navigate(-1);
        } catch (err) {
            console.error("Update Gagal:", err);
            alert("Gagal Update Data!");
        }
    };

    return (
       <div>
            <h1 className="text-xl font-bold mb-2">Update User</h1>
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
                <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1">
                    {loading ? "Menyimpan..." : "Update"}
                </button>
            </form>
        </div> 
    );
}

export default UpdateLocation;