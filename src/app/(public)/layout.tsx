import Header from "@/components/header/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <Header />
      {children}
    </div>
  );
}
