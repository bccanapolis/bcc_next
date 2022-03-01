import Banner from '@/components/layout/Banner';
import Breadcrump from '@/components/micro/Breadcrumb';

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