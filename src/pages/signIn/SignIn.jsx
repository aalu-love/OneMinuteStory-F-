import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { signInStart, signInSuccess, signInFailure } from "../../store/user/userSlice";
// import data from '../../store/'
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../store/action";
import OAuth from "../../components/OAuth";
// import OAuth from "../components/OAuth";

function SignIn() {
    const errorStatus = useSelector((state) => state?.oneMinuteStory?.error);

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const { loading, error } = useSelector((state) => state?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // dispatch(signInStart());
            // const res = await fetch('http://localhost:3000/OMS-api/auth/signin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            dispatch(signInUser(formData.email, formData.password));
            // const data = await res.json();
            // console.log("Success", data);
            // setLoading(false);

            // if (data.success === false) {
            //     // setError(true);
            //     dispatch(signInUser(data));
            //     return;
            // }
            // dispatch(signInSuccess(data));
            setError(errorStatus);

            // if there is no error while signing in then it will navigate to homepage
            if (error) {
                navigate("/");
            }
        } catch (error) {
            // setLoading(false);
            setError(true);
            console.log("Error inside", error);

            console.log("Error Sign in", error);
            dispatch(signInUser(error));
        }
    };

    if (error === true) {
        console.log("Error", error);
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />

                <button
                    // disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {/* {loading ? "Loading..." : "Sign In"} */}
                    Sign In
                </button>
                <OAuth data="signin" />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don&apos;t Have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
            <p className="text-red-700 mt-5">
                {/* {error ? error.message || "Something went wrong" : ''} */}
                {error ? "Something went wrong" : ""}
            </p>
        </div>
    );
}

export default SignIn;
