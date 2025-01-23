export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full max-w-7xl flex-col items-start gap-12">{children}</div>;
}
