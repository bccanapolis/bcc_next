import Banner from '@/components/layout/Banner';

export default function Home() {
  const images = [{ url: '/img/5.jpg', alt: '' }, { url: '/img/hero3.jpg', alt: '' }, {
    url: '/img/EK9o3S2WoAArZMf.jpg',
    alt: ''
  }];

  return (
    <>
      <Banner fullscreen={true} images={images}>
        <h1 className='text-6xl text-white'>Hello wordl</h1>
      </Banner>
    </>
  );
}
