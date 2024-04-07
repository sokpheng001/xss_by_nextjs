import FormLogin from "@/components/FormLogin";
export const metadata = {
  title: "ISTAD - Vulnerable -  Login",
  description: "Hack to Learn",
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
