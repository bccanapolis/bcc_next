import { classNames } from '@/utils';

export default function Container({ children, id, className }) {
  return (
    <>
      <section id={id} className={classNames('container py-8', className)}>
        {children}
      </section>
    </>
  );
}
