import Image from "next/image";
import Navbar from "@/components/Navbar";
import TextPredictor from "@/components/TextPredictor";
export default function Home() {
  return (
      <>
        <Navbar/>
        <TextPredictor/>
      </>
  );
}
