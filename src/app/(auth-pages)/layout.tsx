export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full min-h-screen w-full flex-col items-start gap-12">{children}</div>;
}
