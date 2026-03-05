import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function useLogin() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        setError("");

        try {
            const res = await api.post(`/login/user`, {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            if (res.data.user.role === 'admin' || res.data.user.role === 'adminLocation' || res.data.user.role === 'adminEvent') {
                navigate("/dashboard/admin");
            } else if (res.data.user.role === 'customer') {
                navigate("/dashboard/customer");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Login failed, Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async(formData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("register/", formData);
            return res.data;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }

            await api.post(
                `/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");

        } catch (err) {
            console.error("Logout error:", err);
            setError("Logout failed, please try again.");

        } finally {
            setLoading(false);
        }
    };

    return { login, logout, register, loading, error };
}

export default useLogin;