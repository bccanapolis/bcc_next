export default function Container({ children, id, className }) {
  return (
    <>
      <section id={id} className={`container py-8 ${className}`}>{children}</section>
    </>
  );
}