import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';

export default function ImageCarousel({ images, id, className = '', duration = 700 }) {
  return (
    <>
      <div id={id} data-carousel='slide' className={`relative ${className}`}>
        {/*ImageCarousel Wrapper*/}
        <div className='overflow-hidden relative w-full h-full'>
          {
            images.map((item, index) => (
              <div
                key={item.url}
                className='hidden duration-700 ease-in-out'
                data-carousel-item={index === 0 ? 'active' : ''}>
                <img src={item.url}
                     className='block absolute object-cover object-center top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 h-full '
                     alt={item.alt} />
              </div>
            ))
          }
        </div>


        {/*  /!*Slider Indicators*!/*/}
        {/*  <div className='flex absolute bottom-5 left-1/2 space-x-3 -translate-x-1/2'>*/}
        {/*    {*/}
        {/*      images.map((item, index) => (*/}
        {/*        <button key={'button-' + item.url} type='button'*/}
        {/*                className='w-3 h-3 rounded-full bg-white dark:bg-gray-800'*/}
        {/*                aria-current={index == 0}*/}
        {/*                aria-label='Slide 1' data-carousel-slide-to={index} />*/}
        {/*      ))*/}
        {/*    }*/}
        {/*  </div>*/}


        {/*  /!*Slider Controls*!/*/}
        {/*  <button type='button'*/}
        {/*          className='flex absolute top-0 left-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none'*/}
        {/*          data-carousel-prev=''>*/}
        {/*    <ChevronLeftIcon*/}
        {/*      className='inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none' />*/}
        {/*  </button>*/}
        {/*  <button type='button'*/}
        {/*          className='flex absolute top-0 right-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none'*/}
        {/*          data-carousel-next=''>*/}
        {/*    <ChevronRightIcon*/}
        {/*      className='inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none' />*/}
        {/*  </button>*/}
      </div>
    </>
  );
}