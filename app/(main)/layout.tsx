import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Toaster from "@/components/Toaster";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
