export default function Container({ children, className }) {
  return (
    <>
      <section className={`container py-8 ${className}`}>{children}</section>
    </>
  );
}