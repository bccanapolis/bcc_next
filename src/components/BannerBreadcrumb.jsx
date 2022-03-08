import Banner from '@/components/layout/Banner';
import Breadcrump from '@/components/atoms/Breadcrumb';

export default function BannerBreadcrumb({ paths, children, images }) {
  return (
    <>
      <Banner images={!!images.length ? images : null}>
        <div className='flex justify-center items-center flex-col container'>
          {children}
          <Breadcrump paths={paths} className='mt-8' />
        </div>
      </Banner>
    </>
  );
}