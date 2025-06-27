import { Navbar } from "~/app/_components/Navbar";
import { Footer } from "~/app/_components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="mx-auto py-8">{children}</div>\
      <Footer />
    </div>
  );
}
