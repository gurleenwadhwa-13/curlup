import {MainContainer} from "@/components/MainContainer/MainContainer";
import { Header } from "@/components/Header/Header";

export default function Home() {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <MainContainer />
      </div>
    );
}
