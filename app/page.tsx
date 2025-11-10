import { QueryPanel } from "@/components/QueryPanel/queryPanel";
import { ResponsePanel } from "@/components/ResponsePanel/responsePanel"
import { Header } from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-4 h-[calc(100vh-150px)]">
          <QueryPanel />
          {/* <ResponsePanel /> */}
        </div>
      </main>
    </div>
  );
}
