import Banner from '@/components/layout/Banner';
import Link from 'next/link';

export default function CodeBannerSection() {
  const image = [{ url: '/img/banner_Code.png', alt: 'Banner da Code Tower' }];
  return (
    <Banner images={image} overlay={true}>
      <div className='text-white space-y-8 text-center'>
        <h6 className='text-5xl'>
          Empresa júnior
        </h6>
        <p className='w-1/2 mx-auto'>
          Conheça a Code Tower, a EJ do IFG voltada para o desenvolvimento de
          soluções de TI que mais cresce no estado de Goiás
        </p>
        <div>
          <Link href='/extensao/empresa-junior'>
            <a
              className='py-2 px-4 border mx-4 hover:text-primary hover:border-primary transition-colors duration-300'>
              Saiba Mais
            </a>
          </Link>
          <Link target='_blank' href='https://codetower.com.br/'
          >

            <a
              className='text-black bg-white border py-2 px-4 hover:bg-primary hover:text-neutral-100 hover:border-primary transition-colors duration-300'>Acesse
              o Site</a>
          </Link>
        </div>
      </div>
    </Banner>
  )
    ;
}
