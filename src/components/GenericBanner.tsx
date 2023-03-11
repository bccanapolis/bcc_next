import { classNames } from '@/utils';
import Container from '@/components/layout/Container';
import * as React from 'react';
import Banner from '@/components/layout/Banner';

export default function GenericBanner({
  section = {
    subtitle: '',
    title: '',
  },
  className,
  classTitle,
  children,
  images = [],
  imageOverlay = true,
}) {
  const DynamicContainer = !!images.length ? Banner : Container;

  if (!!images.length) {
    DynamicContainer['defaultProps'] = {
      className: classNames(
        'flex flex-col items-center justify-center',
        className
      ),
      images,
      overlay: imageOverlay,
    };
  } else {
    DynamicContainer['defaultProps'] = {
      className: classNames(
        'flex flex-col items-center justify-center',
        className
      ),
    };
  }

  return (
    <DynamicContainer>
      <div
        className={classNames(
          (!!section.subtitle || !!section.title) && 'space-y-2 mb-12'
        )}
      >
        <h6
          className={classNames(
            classTitle ?? 'text-4xl font-bold text-center',
            !section.title && 'hidden'
          )}
        >
          {section.title}
        </h6>
        <p
          className={classNames(
            'font-light text-center max-w-3xl mx-auto',
            !section.subtitle && 'hidden'
          )}
        >
          {section.subtitle}
        </p>
      </div>
      {children}
    </DynamicContainer>
  );
}
