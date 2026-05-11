import { PublicNavbar } from "@/components/public/navbar";
import { PublicFooter } from "@/components/public/footer";

// Layout wrapping all public-facing pages (home, about, features, contact)
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
