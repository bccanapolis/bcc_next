import Banner from '@/components/layout/Banner';
import Link from 'next/link';

export default function CodeBannerSection({ className }) {
  const image = [{ url: '/img/banner_Code.png', alt: 'Banner da Code Tower' }];
  return (
    <Banner images={image} overlay={false} className={className}>
      <div className="text-white space-y-8 text-center">
        <h6 className="text-4xl font-bold text-center">Empresa júnior</h6>
        <p className="w-1/2 mx-auto">
          Conheça a Code Tower, a EJ do IFG voltada para o desenvolvimento de
          soluções de TI que mais cresce no estado de Goiás
        </p>
        <div>
          <Link
            href="/extensao/empresa-junior"
            className="py-2 px-4 border mx-4 hover:text-primary hover:border-primary transition-colors duration-300"
          >
            Saiba Mais
          </Link>
          <Link
            target="_blank"
            href="https://codetower.com.br/"
            className="text-black bg-white border py-2 px-4 hover:bg-primary hover:text-neutral-100 hover:border-primary transition-colors duration-300"
          >
            Acesse o Site
          </Link>
        </div>
      </div>
    </Banner>
  );
}
