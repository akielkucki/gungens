import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/HeroSection";
import FeaturesSection from "@/src/components/FeaturesSection";
import GameplaySection from "@/src/components/GameplaySection";
import CommunitySection from "@/src/components/CommunitySection";
import FAQSection from "@/src/components/FAQSection";
import Footer from "@/src/components/Footer";
import OwnershipNotification from "@/src/components/OwnershipNotification";


export default function Home() {
  return (
      <main>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <GameplaySection />
        <CommunitySection />
        <FAQSection />
        <Footer />
        <OwnershipNotification/>
      </main>
  );
}

