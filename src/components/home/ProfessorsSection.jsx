import { apiAsset, classNames } from '@/utils';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

export default function ProfessorsSection({ professors = [], className }) {
  return (
    <div className={classNames('container', className)}>
      <div className='space-y-2 mb-16'>
        <h5 className='text-4xl font-bold text-center'>Nossos docentes</h5>
        <p className='font-light text-center'>In the history of modern astronomy there is.</p>
      </div>

      <Swiper
        className='swiper-overflow'
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 }
          // 1534:{},
        }}
        autoplay={{
          delay: 5000
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
      >
        {
          !!professors.length &&
          professors.map(professor => (
            <SwiperSlide key={`professor-section-${professor.id}`}
                         className='flex flex-col items-center justify-center'>
              <div className='relative w-48 h-48 rounded-full mb-4'>
                <Image
                  src={professor.avatar ? apiAsset(professor.avatar.id) : '/img/open_graph_squared.png'}
                  className='object-cover rounded-full'
                  layout='fill' />
              </div>
              <div className='inline-block text-center'>
                <p className='font-medium'>{professor.degree} {professor.name}</p>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}