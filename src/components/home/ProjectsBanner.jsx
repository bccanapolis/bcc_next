import Link from 'next/link';
import { classNames } from '@/utils';
import GenericBanner from '@/components/GenericBanner';

export default function ProjectsBanner({
  section,
  classTitle,
  className,
  images = [],
}) {
  return (
    <div className={classNames(className)}>
      <GenericBanner
        section={section}
        className={classNames(!!images.length && 'text-white')}
        images={images}
      >
        <div className="flex justify-center">
          <Link href="/acoes-ensino/projetos">
            <a className="text-black bg-white border py-2 px-4 hover:bg-primary hover:text-neutral-100  transition-colors duration-300">
              Ir aos projetos
            </a>
          </Link>
        </div>
      </GenericBanner>
    </div>
  );
}
