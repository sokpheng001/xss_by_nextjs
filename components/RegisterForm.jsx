"use client";
import { Formik } from "formik";
import { useRouter } from "next/navigation";

const register = async function (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password1: password,
    password2: confirmPassword,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("https://store.istad.co/api/user/register/", requestOptions)
    .then((response) => register.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

const RegisterForm = () => {
  const router = useRouter();
  return (
    <div className="gap-3 flex flex-col">
      <h1 className=" font-semibold text-xl">Register in app</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        // }}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(async () => {
            await register(
              values.firstName,
              values.lastName,
              values.email,
              values.password,
              values.confirmPassword
            );
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            className="bg-white  gap-4 rounded-md p-8 flex flex-col justify-center items-center"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              {/* first name */}
              <input
                id="firstName"
                type="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                placeholder="First name"
                className="p-2 border outline-none rounded-md"
              />
              {/* last name */}
              <input
                id="lastName"
                type="lastName"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                placeholder="Last name"
                className="p-2 border outline-none rounded-md"
              />
            </div>
            {/* email */}
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email"
              className="p-2 border outline-none rounded-md w-full"
            />
            {/* <p className="text-red-100">{errors.email && touched.email && errors.email}</p> */}
            {/* password */}
            <div className="flex gap-4 flex-col md:flex-row">
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
                className="p-2 border outline-none rounded-md"
              />
              {/* confirm password */}
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                className="p-2 border outline-none rounded-md"
              />
            </div>
            {/* {errors.password && touched.password && errors.password} */}
            {/* button */}
            {isSubmitting ? (
              <div className="w-full">
                <button
                  type="submit"
                  disabled={true}
                  className="animate-pulse border bg-yellow-100 active:bg-green-200 duration-300 p-2 w-full rounded-md"
                >
                  Registering
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border bg-yellow-100 active:bg-green-200 duration-300 p-2 w-full rounded-md"
                >
                  Register
                </button>
                <p className="text-center text-sm">OR</p>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  disabled={isSubmitting}
                  className=" border bg-yellow-100 active:bg-green-200 duration-300 p-2 w-full rounded-md"
                >
                  Login
                </button>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
