import { useEffect, useState } from "react";
import api from "../api/axios";

function useLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/location`);
            setLocations(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const showLocationId = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`/location/${id}`);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createLocation = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post(`location/store`, formData);
            fetchLocations();
            return res.data.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateLocation = async (id, formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`location/update/${id}`, formData);
            await fetchLocations();
            return res.data;
        } catch (err) {
            console.error("Update Data Error:", err.response?.data || err.message);
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteLocation = async (id) => {
        setLoading(true);
        setError(null);

        try{
            const res = await api.delete(`location/destroy/${id}`);
            await fetchLocations();
        } catch (err) {
            console.error("Delete Location Error", err.response?.data || err.message);
            setError(err.response?.data || "Terjadi Kesalahan");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { locations, loading, error, fetchLocations, showLocationId, createLocation, updateLocation, deleteLocation };
}

export default useLocations;