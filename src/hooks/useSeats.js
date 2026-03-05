import { useEffect, useState } from "react";
import api from "../api/axios";

function useSeats() {
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async () => {
        setLoading(true);
        try {
            const res = await api.get(`seat`);
            setSeats(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const createSeat = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`seat/store`, formData);
            fetchSeats();
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateSeats = async (seatForm) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("seat/update", seatForm);
            await fetchSeats();
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { seats, loading, error, fetchSeats, createSeat, updateSeats };
}

export default useSeats;
