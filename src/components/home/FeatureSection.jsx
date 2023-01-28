import { classNames } from '@/utils';
import Link from 'next/link';

export default function FeatureSection({ features = [], className }) {
  return (
    <div
      className={classNames(
        'grid grid-cols-1 lg:grid-cols-3 -mt-16 z-0 container gap-12',
        className
      )}
    >
      {features.map((feat, index) => (
        <Link href={feat.link ?? ''} key={`feature-${index}`}>
          <a className="z-10 group cursor-pointer shadow">
            <div className="h-16 bg-primary lg:bg-neutral-100/20 flex items-center justify-center lg:group-hover:bg-primary transition-colors duration-300">
              <p className="text-neutral-100 font-medium uppercase">
                {feat.title || `Feature ${index + 1} Title`}
              </p>
            </div>
            <div className="p-4">
              <p className="text-center">
                {feat.description || `Feature ${index + 1} Description`}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
