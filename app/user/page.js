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
  const [isBio, setBio] = useState(false);
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
          className="animate-pulse p-2  w-32 rounded-md active:bg-red-500 duration-500"
          onClick={() => {
            handleLogout();
          }}
        >
          Processing...
        </button>
      ) : (
        <>
          <div className="flex flex-col gap-2 p-4 rounded-md border w-72 items-center">
            <img
              src={profile?.avatar}
              className="rounded-full border-2 border-yellow-300 w-20"
            />
            <p>{profile?.bio}</p>
          </div>
          {/* button */}
          <div className="flex gap-2">
            <form
              className="flex flex-col items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                var data = document.getElementById("bio")?.value;
                // console.log(data);
                if (
                  data.includes("<script>alert") &&
                  !data.includes("localStorage")
                ) {
                  var regex = /alert\s*\(\s*['"`]\s*([^'`"]+)\s*['"`]\s*\)/; // Regular expression to match the word inside the alert function
                  var match = data.match(regex); // Matching the regular expression against the input string

                  if (match && match.length > 1) {
                    alert(match[1]); // Returning the matched word
                  } else {
                    // Returning null if no match is found
                    alert();
                  }
                } else if (
                  data.includes("local") &&
                  data.includes("Storage") &&
                  data.includes("script") &&
                  data.includes("console") &&
                  (data.includes("getItem(\"token\")") || data.includes("getItem(\'token\')") || data.includes("getItem(\`token\`)"))
                ) {
                  console.log(localStorage.getItem("token"));
                } else if (
                  data.includes("local") &&
                  data.includes("Storage") &&
                  data.includes("script") &&
                  data.includes("console")
                ) {
                  console.log(localStorage);
                } else if (
                  data.includes("local") &&
                  data.includes("Storage") &&
                  data.includes("script") &&
                  data.includes("alert") &&
                  data.includes("getItem")
                ) {
                  alert(localStorage.getItem("token"));
                }
              }}
            >
              <div className="flex gap-2">
                <button
                  className="hover:bg-red-500 hover:text-white text-red-500 p-2 border w-[140px] rounded-md active:bg-red-500 duration-700"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
                <button
                  className="p-2 border w-[140px] rounded-md active:bg-green-300 duration-500"
                  onClick={() => {
                    setBio(true);
                  }}
                >
                  Update
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="bio">Your Bio</label>
                <textarea
                  className="w-72 outline-none p-2 rounded-md"
                  placeholder="Update your bio"
                  id="bio"
                  rows="4"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
}
