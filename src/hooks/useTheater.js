import { useEffect, useState } from "react";
import api from "../api/axios";

function useTheaters() {
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTheaters();
    }, []);

    const fetchTheaters = async () => {
        setLoading(true);
        try {
            const res = await api.get(`theater`);
            setTheaters(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const showTheater = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(`/theater/${id}`);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createTheater = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post(`theater/store`, formData);
            fetchTheaters();
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateTheater = async (id, formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`theater/update/${id}`, formData);
            await fetchTheaters();
            return res.data;
        } catch (err) {
            console.error("Update data error:", err.response?.data || err.message);
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteTheater = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.delete(`theater/destroy/${id}`);
            await fetchTheaters();
        } catch (err) {
            console.error("Delete Data Error:", err.response?.data || err.message);
            setError(err.response?.data || "Terjadi Kesalahan");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { theaters, loading, error, fetchTheaters, createTheater, updateTheater, deleteTheater, showTheater };
}

export default useTheaters;