"use client";
import { getAccessToken, removeAccessToken } from "@/utils/manapulate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function acessToken() {
  return getAccessToken();
}

const getProfile = async (accessToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  // myHeaders.append(
  //   "Cookie",
  //   "csrftoken=B75aMMtI5tspdMVbNjDuJlBZcjlQb4zOLRCNGd6Dub2XkHTTKuH9NxfZIPP2Zwna; sessionid=fd0488qlg1lj1pa1b812ci1wtl6ezlmx"
  // );
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const fecthing = await fetch(
    "https://store.istad.co/api/user/profile/",
    requestOptions
  );
  const profile = await fecthing.json();
  // console.log(profile);
  return profile;
};

export default function Page() {
  const router = new useRouter();
  const [tokenForAccess, setTokenForAccess] = useState(null);
  const [profile, setProfile] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    setIsLogout(true);
    setTokenForAccess(acessToken());
    async function get() {
      setProfile(await getProfile(acessToken()));
    }
    get();
  }, []);

  // useEffect(()=>{
  //   console.log("Logout")
  //   removeAccessToken()
  // },[])
  const handleLogout = () => {
    router.push("/login");
    removeAccessToken();
  };
  if (isLogout) {
    if (tokenForAccess == null) {
      router.push("/login");
    }
  }
  return (
    <main className="bg-gradient-to-b from-cyan-100 to-white gap-2 flex min-h-screen flex-col items-center justify-center">
      {tokenForAccess === null ? (
        <button
          className="text-red-500 p-2 border w-32 rounded-md active:bg-red-500 duration-500"
          onClick={() => {
            handleLogout();
          }}
        >
          Go Back
        </button>
      ) : (
        <>
          <img
            src={profile?.avatar}
            className="rounded-full border-2 border-yellow-300 w-20"
          />
          <p>{profile?.bio}</p>
          <button
            className="text-red-500 p-2 border w-32 rounded-md active:bg-red-500 duration-500"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </>
      )}
    </main>
  );
}
