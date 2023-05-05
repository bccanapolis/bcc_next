import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import Image from 'next/image';
import { classNames } from '@/utils';

export default function Banner({
  fullscreen,
  childPadding = true,
  images = null,
  overlay = true,
  children,
  className,
  navigation = false,
  imageLoading = 'lazy',
}) {
  const img = images || [
    { url: '/img/carousel/DSC_0070.webp', alt: 'Grupo da Computação 2023' },
    { url: '/img/carousel/DSC_0093.webp', alt: 'Grupo da Computação 2023' },
    { url: '/img/carousel/DSC_0128.webp', alt: 'Grupo da Computação 2023' },
    { url: '/img/carousel/DSC_0160.webp', alt: 'Grupo da Computação 2023' },
    { url: '/img/EK9o3S2WoAArZMf.webp', alt: 'Coleta de Lixo Eletrônico 2019' },
  ];

  return (
    <>
      <div
        className={classNames(
          fullscreen ? 'h-[100vh]' : '',
          'relative z-0 w-full',
          className
        )}
      >
        <div className={classNames(childPadding && 'pb-20 pt-32', 'container')}>
          {children}
        </div>
        <div className="absolute top-0 h-full w-full -z-10">
          {img.length > 1 ? (
            <Swiper
              slidesPerView={1}
              autoplay={{
                delay: 5000,
              }}
              modules={[Autoplay]}
              className="h-full"
            >
              {img.map((item, index) => (
                <SwiperSlide className="h-full" key={'slide-' + index}>
                  {item.url.includes(process.env.NEXT_PUBLIC_API_URL) ? (
                    <img
                      className={classNames(
                        'h-full w-full object-cover object-center',
                        overlay && 'brightness-50'
                      )}
                      src={item.url}
                      alt={item.alt}
                      loading={imageLoading}
                    />
                  ) : (
                    <Image
                      className={classNames(
                        'h-full w-full object-cover object-center',
                        overlay && 'brightness-50'
                      )}
                      src={item.url}
                      alt={item.alt}
                      layout="fill"
                      loading={imageLoading}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : img[0].url.includes(process.env.NEXT_PUBLIC_API_URL) ? (
            <img
              className={classNames(
                'h-full w-full object-cover object-center',
                overlay && 'brightness-50'
              )}
              src={img[0].url}
              alt={img[0].alt}
              loading={imageLoading}
            />
          ) : (
            <Image
              className={classNames(
                'h-full w-full object-cover object-center',
                overlay && 'brightness-50'
              )}
              src={img[0].url}
              alt={img[0].alt}
              layout="fill"
              loading={imageLoading}
            />
          )}
        </div>
      </div>
    </>
  );
}
