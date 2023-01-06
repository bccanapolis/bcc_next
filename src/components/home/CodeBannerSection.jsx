
import Banner from '@/components/layout/Banner';

export default function CodeBannerSection() {
  const image = [{ url: '/img/banner_Code.png', alt: 'Banner da Code Tower' }];
  return (
    <Banner images={image} overlay={false}>
      <div className="text-white text-center grid gap-6">
        <div>
          <h6 className="text-5xl font-normal">
            Empresa júnior
          </h6>
        </div>
        <div className="flex items-center justify-center">
          <p className="w-3/6">
            Conheça a Code Tower, a EJ do IFG voltada para o desenvolvimento de
            soluções de TI que mais cresce no estado de Goiás
          </p>
        </div>
        <div>
          <a href="/extensao/empresa-junior" className="py-2 px-4 border mx-4 hover:text-primary hover:border-primary transition-colors duration-300">
            Saiba Mais
          </a>
          <a href="https://codetower.com.br/" className="text-black bg-white border py-2 px-4 hover:bg-primary hover:text-neutral-100 hover:border-primary transition-colors duration-300">
            Acesse o Site
          </a>
        </div>
      </div>
    </Banner>
  );
}
