import { useEffect, useState } from "react";
import api from "../api/axios";

function useSchedules() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            const res = await api.get("schedule");
            setSchedules(res.data.data); // <- pastikan ini update state
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };


    const showSchedule = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(`schedule/${id}`);
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.data);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createSchedule = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post(`schedule/store`, formData);
            await fetchSchedules();
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateSchedule = async (id, formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`schedule/update/${id}`, formData);
            await fetchSchedules();
            return res.data;
        } catch (err) {
            console.error("Update data error:", err.response?.data || err.message);
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteSchedule = async (id) => {
        setLoading(true);
        setError(null);

        try {
            await api.delete(`schedule/destroy/${id}`);
            await fetchSchedules(); // langsung reload dari server
        } catch (err) {
            console.error("Delete error:", err.response?.data || err.message);
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return { schedules, loading, error, fetchSchedules, createSchedule, updateSchedule, deleteSchedule, showSchedule };
}

export default useSchedules;