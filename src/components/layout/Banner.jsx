import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import Image from 'next/image';

export default function Banner({ fullscreen, images = null, children }) {
  const img = images || [{ url: '/img/EK9o3S2WoAArZMf.webp', alt: 'Coleta de Lixo Eletrônico 2019' }];

  return (
    <>
      <div style={{}} className={`${fullscreen ? 'h-[100vh]' : ''} relative z-0 w-full`}>
        <div className='pb-20 pt-40 container'>
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
                modules={[Autoplay]}
                className='h-full'
              >
                {
                  img.map((item, index) => (
                    <SwiperSlide className='h-full' key={'slide-' + index}>
                      <Image className='h-full object-cover object-center' src={item.url} alt={item.alt}
                             layout='fill' priority={true} loading='eager' />
                    </SwiperSlide>
                  ))
                }
              </Swiper> :
              <Image className='h-full object-cover object-center' src={img[0].url} layout='fill' priority={true}
                     loading='eager' />
          }

          <div className='absolute top-0 h-full w-full bg-overlay -z-0' />
        </div>

      </div>
    </>
  );
}