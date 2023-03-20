import { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../utils/toastOptions";
import { getUserRegister } from "../../services/userService";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
      return;
    }
  }, []);

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { email, username, password } = values;
        const { data } = (await getUserRegister(email, username, password)) as {
          data: any;
        };
        if (!data?.status) {
          toast.error(data.msg, toastOptions);
          return;
        }
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigate("/");
        return;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-gray-900">
        <form
          action=""
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-8 bg-black bg-opacity-60 rounded-xl p-20"
        >
          <div className="flex items-center justify-center">
            <h1 className="text-white uppercase ">Technovez_Chat</h1>
          </div>
          <input
            className="bg-transparent px-4 py-2 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent px-4 py-2 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent px-4 py-2 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent px-4 py-2 border border-solid border-indigo-600 rounded-md text-white w-full text-base focus:border-indigo-300 outline-none"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md text-sm uppercase hover:bg-purple-80"
          >
            Create User
          </button>
          <span className="text-white uppercase">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="text-indigo-600 no-underline font-bold"
            >
              Login.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
