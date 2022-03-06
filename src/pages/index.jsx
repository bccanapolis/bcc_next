import Banner from '@/components/layout/Banner';

export default function Home() {
  return (
    <>
      <Banner fullscreen={true} images={['/img/5.jpg', '/img/hero3.jpg', '/img/EK9o3S2WoAArZMf.jpg']}>
        <h1 className='text-6xl text-white'>Hello wordl</h1>
      </Banner>
    </>
  );
}
