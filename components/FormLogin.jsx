"use client";
import { getAccessToken } from "@/utils/manapulate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = async (email, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append(
  //   "Cookie",
  //   "csrftoken=B75aMMtI5tspdMVbNjDuJlBZcjlQb4zOLRCNGd6Dub2XkHTTKuH9NxfZIPP2Zwna; sessionid=fd0488qlg1lj1pa1b812ci1wtl6ezlmx"
  // );
  if (email.includes("a")) {
    // alert(localStorage)
  }
  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const fecthing = await fetch(
      "https://store.istad.co/api/user/login/",
      requestOptions
    );
    if (fecthing.status === 200) {
      const data = await fecthing.json();
      localStorage.setItem("token", data?.access_token);
      return fecthing.status;
    } else {
      return fecthing.status;
    }
  } catch (e) {}
};

const FormLogin = () => {
  const router = useRouter();
  const [accesToken, setAccessToken] = useState(null);
  useEffect(() => {
    async function get() {
      setAccessToken(getAccessToken());
    }
    get();
  }, []);
  if (accesToken) {
    router.push("/user");
  } else {
    return (
      <div className="gap-3 flex flex-col ">
        <ToastContainer />
        <h1 className=" font-semibold text-xl">Log in your app</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if ((await Login(values.email, values.password)) === 401) {
              toast.warn("Invalid password or email, please try again.", {
                position: "top-center",
              });
              router.push("/login");
            } else {
              router.push("/user");
            }
            // alert(localStorage.getItem("token"));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              className=" duration-500 bg-white  gap-4 rounded-md p-8 flex flex-col justify-center items-center"
            >
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                className="p-2 border outline-none rounded-md"
                disabled={isSubmitting}
              />

              {/* <p className="text-red-100">{errors.email && touched.email && errors.email}</p> */}
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
                className="p-2 border outline-none rounded-md"
                disabled={isSubmitting}
              />
              {errors.password && touched.password && errors.password}
              {isSubmitting ? (
                <div className="duration-500 w-full">
                  <button
                    type="submit"
                    disabled={true}
                    className="animate-pulse border bg-yellow-50 active:bg-green-200 duration-300 p-2 w-full rounded-md cursor-not-allowed"
                  >
                    Login...
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full duration-500">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" border bg-yellow-100 active:bg-green-200 duration-300 p-2 w-full rounded-md"
                  >
                    Login
                  </button>
                  {/* <p className="text-center text-sm">OR</p>
                // Login
                <button
                  type="button"
                  onClick={() => {
                    router.push("/register");
                  }}
                  className=" border bg-yellow-100 active:bg-green-200 duration-300 p-2 w-full rounded-md"
                >
                  Register
                </button> */}
                </div>
              )}
              {/* <p
                hidden={true}
                dangerouslySetInnerHTML={{
                  __html: values.email.includes("script")
                    ? "<script>alert()</script>"
                    : `<script>alert()</script>`,
                }}
              /> */}
            </form>
          )}
        </Formik>
      </div>
    );
  }
};

export default FormLogin;
