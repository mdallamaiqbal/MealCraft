import HeroBanner from "./components/Banner";
import FaqSection from "./components/FaqSection";
import TopFoods from "./components/TopFood";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TopFoods />
      <FaqSection />
    </div>
  );
}
