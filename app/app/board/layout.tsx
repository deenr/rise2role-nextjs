export default function Layout({
  children,
  modalTrigger
}: Readonly<{
  children: React.ReactNode;
  modalTrigger: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {modalTrigger}
    </>
  );
}
