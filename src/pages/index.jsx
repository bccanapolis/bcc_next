import Banner from '@/components/layout/Banner';
import Image from 'next/image';

export default function Home() {
  const images = [{ url: '/img/5.webp', alt: '' }, { url: '/img/hero3.webp', alt: '' }, {
    url: '/img/EK9o3S2WoAArZMf.webp',
    alt: ''
  }];

  return (
    <>
      <Banner fullscreen={true} images={images}>
        <div className='container'>
          <p className='text-center mt-20'>
            <Image
              src='/img/bcc_anapolis_logo.svg'
              width={800}
              height={160}
            />
          </p>
        </div>
      </Banner>
    </>
  );
}
