import Academy from "@/components/Academy";
import Facilities from "@/components/Facilities";
import Founder from "@/components/Founder";
import FromTheFounder from "@/components/FromTheFounder";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Navbar from "@/components/Navbar";
import Stories from "@/components/stories";
import Village from "@/components/Village";
import Vision from "@/components/Vision";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <Hero />
      <Vision />
      <Village />
      <Facilities />
      <Academy />
      <Stories />
      <Founder />
      <FromTheFounder />
      <Journey />
    </main>
  );
}