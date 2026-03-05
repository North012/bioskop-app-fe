import { useEffect, useState } from "react";
import api from "../api/axios";

function useFilms() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFilms();
    }, []);

    //get all data
    const fetchFilms = async () => {
        setLoading(true);
        try {
            const res = await api.get("film");
            setFilms(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const nowPlayingFilm = async() => {
        setLoading(true);
        try {
            const res = await api.get(`film/now-playing`);
            setFilms(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const showFilm = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`/film/${id}`);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // create
    const createFilm = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("film/store", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            fetchFilms();
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateFilm = async (id, formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`film/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            await fetchFilms();
            return res.data;
        } catch (err) {
            console.error("Update Film Error:", err.response?.data || err.message);
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteFilm = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.delete(`film/destroy/${id}`);
            await fetchFilms();
        } catch (err) {
            console.error("Delete Data Error:", err.response?.data || err.message);
            setError(err.response?.data || "Terjadi kesalahan");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { films, loading, error, fetchFilms, nowPlayingFilm, showFilm, createFilm, updateFilm, deleteFilm };
}

export default useFilms;
