import { useState } from "react";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logStatus, setLogStatus] = useState("LogIn");

  function handleUserNameChange(e) {
    const { value } = e.target;

    setUserName(value);
  }
  function handlePasswordChange(e) {
    const { value } = e.target;

    setPassword(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            username: userName,
            password: password,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) =>
          data !== "poop" ? props.userData(data) : props.onError()
        );
    } catch (err) {
      console.log(err);
      setLogStatus("Login");
    }
    props.onLogin();
    setLogStatus("Login");
  };

  return (
    <div className="font-fredoka bg-gradient-to-r from-pink-400 to-red-500  pb-8 md:p-[3%] w-full fixed h-screen">
      <p className=" text-end text-[2rem] px-4">
        <b
          className="hover:cursor-default font-fredoka text-[#e5e0f1] hover:text-white"
          onClick={props.onCut}
        >
          x
        </b>
      </p>
      <div className="bg-[#fff2f5] text-red-400 mx-8 md:mx-16 grid grid-cols-1 md:grid-cols-3 rounded-xl">
        <div className="imgDiv col-span-2">
          <img
            className="w-full h-full rounded-xl"
            src="/wonderwoman.webp"
            alt=""
          />
        </div>
        <div className="loginDiv px-4">
          <p className="authenticateText font-fredoka text-xl md:text-3xl my-4 md:my-8">
            {" "}
            Log in with an existing account
          </p>
          <form onSubmit={handleSubmit}>
            <label className="text-lg my-4" htmlFor="userName">
              Username <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="block border-none rounded w-[100%] md:w-[90%] h-8 my-4 md:my-6 focus:outline-none"
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              id="userName"
            />
            <label className="text-lg my-4" htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="block border-none rounded w-[100%] md:w-[90%] h-8 my-4 md:my-6 focus:outline-none"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
            />

            <button
              className="bg-pink-500 shadow-md hover:bg-red-400 active:translate-y-0.5 text-white text-2xl my-4 md:my-6 p-[1%]  rounded-lg w-[100%] md:w-[92%] hover:cursor-pointer"
              type={userName && password ? "submit" : "button"}
              onClick={() =>
                userName && password
                  ? setLogStatus(<p className="animate-pulse">Logging in...</p>)
                  : ""
              }
            >
              {logStatus}
            </button>
          </form>

          <p className="authenticateText text-xl mt-4 md:mt-12 py-2">
            {" "}
            Don't have an account? Register!
          </p>
          <button
            className="bg-pink-500 shadow-md hover:bg-red-400 active:translate-y-0.5 text-white text-2xl my-6 p-[1%]  rounded-lg w-[100%] md:w-[92%] hover:cursor-pointer"
            type="button"
            onClick={props.onGoToRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
