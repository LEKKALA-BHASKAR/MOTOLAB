import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const handleGoogleLogin = () => {
        console.log(import.meta.env.VITE_BACKEND_URL)
        window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, "_self")
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Login Page</h2>
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
                >
                    <FcGoogle size={24} />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
