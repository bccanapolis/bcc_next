import { classNames } from '@/utils';
import * as React from 'react';
import Banner from '@/components/layout/Banner';
import Container from '@/components/layout/Container';

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
  function header() {
    return (
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
    );
  }

  if (!!images.length) {
    return (
      <Banner
        className={classNames(
          'flex flex-col items-center justify-center',
          className
        )}
        images={images}
        overlay={imageOverlay}
        fullscreen={undefined}
      >
        <>
          {header()}
          {children}
        </>
      </Banner>
    );
  }

  return (
    <Container
      id={section.title}
      className={classNames(
        'flex flex-col items-center justify-center',
        className
      )}
    >
      {header()}
      {children}
    </Container>
  );
}
