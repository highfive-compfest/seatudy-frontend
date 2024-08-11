import Footer from "@/components/common/main-footer";
import AboutUs from "@/components/home/about-us";
import Explore from "@/components/home/home-explore";
import Hero from "@/components/home/home-hero";
import SuccessStories from "@/components/home/success-story";

export default function Home() {
  const data = "";
  return (
    <>
      <Hero />
      <AboutUs />
      <Explore />
      <SuccessStories />
      <Footer />
    </>
  );
}
