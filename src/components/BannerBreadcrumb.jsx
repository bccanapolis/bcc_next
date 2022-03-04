import Banner from '@/src/components/layout/Banner';
import Breadcrump from '@/src/components/micro/Breadcrumb';

export default function BannerBreadcrumb({ paths, children }) {
  return (
    <>
      <Banner>
        <div className='flex justify-center items-center flex-col container'>
          {children}
          <Breadcrump paths={paths} className='mt-8' />
        </div>
      </Banner>
    </>
  )
}