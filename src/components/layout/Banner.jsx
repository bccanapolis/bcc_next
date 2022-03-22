import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import Image from 'next/image';
import { classNames } from '@/utils';

export default function Banner({
                                 fullscreen,
                                 childPadding = true,
                                 images = null,
                                 overlay = true,
                                 children,
                                 className,
                                 navigation = false
                               }) {
  const img = images || [{ url: '/img/EK9o3S2WoAArZMf.webp', alt: 'Coleta de Lixo Eletrônico 2019' }];

  return (
    <>
      <div className={classNames(fullscreen ? 'h-[100vh]' : '', 'relative z-0 w-full', className)}>
        <div className={classNames(childPadding && 'pb-20 pt-32', 'container')}>
          {children}
        </div>
        <div className='absolute top-0 h-full w-full -z-10'>
          {
            img.length > 1 ?
              <Swiper
                slidesPerView={1}
                autoplay={{
                  delay: 5000
                }}
                navigation={navigation}
                modules={[Autoplay, Navigation]}
                className='h-full'
              >
                {
                  img.map((item, index) => (
                    <SwiperSlide className='h-full' key={'slide-' + index}>
                      {
                        item.url.includes(process.env.NEXT_PUBLIC_API_URL) ?
                          <img
                            className={classNames('h-full w-full object-cover object-center brightness-50')}
                            src={item.url} alt={item.alt} /> :
                          <Image
                            className={classNames('h-full w-full object-cover object-center brightness-50')}
                            src={item.url} alt={item.alt}
                            layout='fill' priority={true} loading='eager' />
                      }

                    </SwiperSlide>
                  ))
                }
              </Swiper> :
              img[0].url.includes(process.env.NEXT_PUBLIC_API_URL) ?
                <img
                  className={classNames('h-full w-full object-cover object-center brightness-50')}
                  src={img[0].url}
                  alt={img[0].alt} /> :
                <Image
                  className={classNames('h-full w-full object-cover object-center brightness-50')}
                  src={img[0].url}
                  alt={img[0].alt}
                  layout='fill' priority={true}
                  loading='eager' />
          }
        </div>
      </div>
    </>
  );
}