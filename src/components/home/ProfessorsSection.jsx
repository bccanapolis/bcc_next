import { apiAsset, classNames } from '@/utils';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { fullName } from '@/utils/user';

export default function ProfessorsSection({ section, professors = [], className }) {
  return (
    <div className={classNames('container', className)}>
      <div className='space-y-2 mb-12'>
        <h5 className='text-4xl font-bold text-center'>{section.title || 'Section Title'}</h5>
        <p className='font-light text-center'>{section.subtitle || 'Section subtitle.'}</p>
      </div>
      <Link href='/pessoas/professores'>
        <a className='text-sm hover:text-primary float-right mb-8'>Saiba mais <ArrowRightIcon
          className='w-4 h-4 inline-block' /></a>
      </Link>
      <Swiper
        className='swiper-overflow clear-both'
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
                         className='flex flex-col items-center group'>
              <div className='relative w-48 h-48 overflow-hidden rounded-full mb-4'>
                <Image
                  src={professor.user.avatar ? apiAsset(professor.user.avatar.id) : '/img/open_graph_squared.png'}
                  className='object-cover rounded-full group-hover:scale-[105%] transition-transform duration-300'
                  layout='fill' />
              </div>
              <div className='inline-block text-center'>
                <p className='font-medium'>{professor.degree} {fullName(professor.user)}</p>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}