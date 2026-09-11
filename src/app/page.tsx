import Facilities from "@/components/Facilities";
import Hero from "@/components/Hero";
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
      <Stories />
    </main>
  );
}