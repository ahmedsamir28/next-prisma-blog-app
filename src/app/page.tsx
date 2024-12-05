import Hero from "./_Components/Home/Hero";
import WebHostingPlan from "./_Components/Home/WebHostingPlan";

export default function Home() {
  return (
    <section>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold border-t-2 pt-5 capitalize">
        Choose Your Web Hosting Plan
      </h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
}
