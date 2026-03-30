import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user =  JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            if (user.role === 'admin' || user.role === 'adminLocation' || user.role === 'adminEvent') {
                navigate("/dashboard/admin");
            } else if (user.role === 'customer') {
                navigate("/dashboard/customer");
            }
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div style={{width: "300px", margin: "100px auto" }}>
            <h2>Login</h2>
            <Link to="/register">
            Register
            </Link>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="email">Email</label> <br />
                    <input 
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label> <br />
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: "10px" }} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;