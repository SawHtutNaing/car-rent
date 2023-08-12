import OurFleet from "../../components/user/home/OurFleet";
import HeroImage from "../../assets/images/hero.png";
import SearchBox from "../../components/user/searchbox";

export default function Home() {
  return (
    <main>
      <section className="h-screen lg:h-[calc(100vh-4rem)] relative flex flex-col items-center xl:justify-center justify-between">
        <div className="w-full flex flex-col items-center justify-center xl:h-max gap-8 xl:gap-4 h-full">
          <h3 className="text-primary text-4xl my-4 text-center lg:text-5xl">
            Choose Your Journey, We&apos;ll Provide the Ride
          </h3>
          <figure className="w-full max-w-2xl">
            <img className="w-full object-contain" src={HeroImage} alt="" />
          </figure>
        </div>
        <SearchBox className=" h-screen" />
      </section>

      <div className="xl:mt-8 mt-16">
        <OurFleet />
      </div>
    </main>
  );
}
