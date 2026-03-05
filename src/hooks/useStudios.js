import { useEffect, useState } from "react";
import api from "../api/axios";

function useStudios() {
    const [studios, setStudios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudios();
    }, []);

    const fetchStudios = async () => {
        setLoading(true);
        try {
            const res = await api.get(`studio`);
            setStudios(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const showStudio = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`/studio/${id}`);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createStudio = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`studio/store`, formData);
            fetchStudios();
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateStudio = async (id, formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`studio/update/${id}`, formData);
            await fetchStudios();
            return res.data;
        } catch (err) {
            console.error("Update data error:", err.response?.data || err.message);
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteStudio = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.delete(`studio/destroy/${id}`);
            await fetchStudios();
        } catch(err) {
            console.error("Delete error:", err.response?.data || err.message);
            setError(err.response?.data || "Terjadi kesalahan");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { studios, loading, error, fetchStudios, createStudio, updateStudio, showStudio, deleteStudio };
}

export default useStudios;