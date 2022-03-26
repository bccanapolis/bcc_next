import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { classNames } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';

export default function Page() {
  const images = [
    { url: '/img/hero3.webp', alt: '' },
    { url: '/img/13.webp', alt: '' },
    { url: '/img/CriaçaoEmpresaJunior.webp', alt: '' },
    { url: '/img/EK9o3S2WoAArZMf.webp', alt: '' }
  ];

  return (
    <>
      <HeadSeo title={'Página não encontrada'}/>
      <main className='flex flex-wrap h-full md:min-h-screen items-center'>
        <div className='px-12 py-20 w-full md:w-1/2'>
          <span className='text-primary'>ERRO 404</span>
          <h1 className='text-3xl font-bold'>Esta página não existe.</h1>
          <p className='text-neutral-700'>A página que você está procurando pôde ser encontrada.</p>
          <hr className='border border-neutral-100 my-4' />
        </div>
        <div className='h-72 md:h-screen w-full md:w-1/2'>
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 15000
            }}
            modules={[Autoplay]}
            className='h-full'
          >
            {
              images.map((item, index) => (
                <SwiperSlide className='h-full' key={'slide-' + index}>
                  <Image
                    className={classNames('h-full w-full object-cover object-center', !!item.tags && item.tags.join(' '))}
                    src={item.url} alt={item.alt}
                    layout='fill' priority={true} loading='eager' />
                </SwiperSlide>
              ))
            }

          </Swiper>
        </div>

      </main>
    </>
  );
};