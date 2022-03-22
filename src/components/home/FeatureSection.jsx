import { classNames } from '@/utils';

export default function FeatureSection({ className }) {
  return (
    <div className={classNames('grid grid-cols-1 lg:grid-cols-3 -mt-16 z-0 container gap-12', className)}>
      {
        [...Array(3).keys()].map((_, index) => (
          <div key={`feature-${index}`} className='z-10 group cursor-pointer shadow'>
            <div
              className='h-16 bg-primary lg:bg-white/20 flex items-center justify-center lg:group-hover:bg-primary transition-colors duration-300'>
              <p className='text-white font-medium uppercase'>Learning Online Courses</p>
            </div>
            <div className='p-4'>
              <p className='text-center'>
                Usage of the Internet is becoming more common due to rapid advancement of technology.
              </p>
            </div>
          </div>
        ))
      }
    </div>
  );
}