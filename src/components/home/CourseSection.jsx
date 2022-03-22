import Banner from '@/components/layout/Banner';
import { BeakerIcon, BookOpenIcon } from '@heroicons/react/outline';
import BrazilSVG from '@/components/atoms/BrazilSVG';

export default function CourseSection({ className }) {
  return (
    <Banner childPadding={false} className={className}>
      <div className='flex flex-col lg:flex-row gap-x-12'>
        <div className='w-full lg:w-6/12 p-0'>
          <div className='py-20 space-y-16'>
            <div>
              <h1 className='text-white text-4xl font-bold mb-8'>
                Get reduced fee during this Summer!
              </h1>
              <p className='text-neutral-200 font-light'>
                inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards
                especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond
                reproach.
              </p>
            </div>
            <div className='grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-2'>
              <div className='space-y-4'>
                <BookOpenIcon className='w-12 h-12 text-primary' />
                <h4 className='text-lg text-white font-medium'>Expert Instructors</h4>
                <p className='text-neutral-200 font-light'>
                  Usage of the Internet is becoming more common due to rapid advancement of technology and power.
                </p>
              </div>
              <div className='space-y-4'>
                <BeakerIcon className='w-12 h-12 text-primary' />
                <h4 className='text-lg text-white font-medium'>Certification</h4>
                <p className='text-neutral-200 font-light'>
                  Usage of the Internet is becoming more common due to rapid advancement of technology and power.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-6/12 bg-white/10 flex items-center justify-center py-20 px-10'>
          <div className='flex w-full h-full'>
            <BrazilSVG className='text-white/80'/>
          </div>

        </div>
      </div>
    </Banner>
  );
}