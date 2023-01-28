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
}) {
  const DynamicContainer = !!images.length ? Banner : Container;

  if (!!images.length) {
    DynamicContainer['defaultProps'] = {
      className,
      images,
      overlay: true,
    };
  } else {
    DynamicContainer['defaultProps'] = {
      className: classNames('py-24', className),
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
