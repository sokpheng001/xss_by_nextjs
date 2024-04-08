import FormLogin from "@/components/FormLogin";
export const metadata = {
  title: "ISTAD - Vulnerable -  Login",
  description: "Hack to Learn",
  openGraph: {
    title: "CSTAD Vulnerable Login Laboratory",
    description:
      "This is the lab for students to pratice XSS vulnerabilities attacks",
    url: "http://136.228.158.126:50004/",
    images: "https://store.istad.co/media/icon_images/ISTAD.jpg",
  },
};
export default function Page(props) {
  // bg-gradient-to-b from-cyan-100 to-white
  return (
    <main className="bg-[url('/images/ISTAD.jpg')] bg-cover">
      <section className=" flex min-h-screen flex-col items-center justify-center backdrop-blur-md bg-white/20">
        <FormLogin />
      </section>
    </main>
  );
}
