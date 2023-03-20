import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../utils/toastOptions";
import { getUserLogin } from "../../services/userService";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
      return;
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = (await getUserLogin(username, password)) as {
        data: any;
      };
      if (!data?.status) {
        toast.error(data?.msg, toastOptions);
        return;
      } else {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigate("/");
        return;
      }
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-gray-900"
        style={{ backgroundColor: "#131324" }}
      >
        <form
          action=""
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-8 bg-black bg-opacity-60 rounded-xl p-20"
        >
          <div className="flex items-center justify-center">
            <h1 className="text-white uppercase">Technovez_Chat</h1>
          </div>
          <input
            className="bg-transparent px-4 py-2 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            className="bg-transparent px-4 py-2 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button
            type="submit"
            className="bg-purple-700 text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md text-sm uppercase hover:bg-purple-80"
          >
            Log In
          </button>
          <span className="text-white uppercase">
            Don't have an account ?{" "}
            <Link
              to="/register"
              className="text-indigo-600 no-underline font-bold"
            >
              Create One.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
