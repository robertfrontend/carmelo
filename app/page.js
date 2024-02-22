import Image from "next/image";
import Graph from "./components/Graph";

export default function Home() {
  return (
    <main>
      <div className="container">
        <Graph />
      </div>
    </main>
  );
}
