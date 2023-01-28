import Banner from '@/components/layout/Banner';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

export default function BannerCode({ className }) {
  const image = [
    {
      url: '/img/Entre_em_contato.png',
      alt: 'foto dos integrandes da Code Tower',
    },
  ];
  return (
    <Banner childPadding={false} className={className} images={image}>
      <div className="flex flex-col lg:flex-row gap-x-12">
        <div className="w-full lg:w-6/12 p-0">
          <div className="py-20 space-y-16">
            <div>
              <h1 className="text-neutral-100 text-4xl font-bold mb-8">
                Saiba mais sobre a Code Tower!
              </h1>
              <p className="text-neutral-300 font-light ">
                Entre no nosso site e redes sociais e aprenda mais sobre a
                Empresa Júnior que mais cresce no estado de Goiás.
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex w-full justify-around lg:w-fit lg:space-x-8">
                <a
                  href="https://www.facebook.com/codetower.ej"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-100 hover:text-primary transition-colors duration-300 w-fit"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-5xl lg:text-3xl"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/code-tower-ej"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-100 hover:text-primary transition-colors duration-300 w-fit"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-5xl lg:text-3xl"
                  />
                </a>
                <a
                  href="@/components/empresa-junior/BannerCode"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-100 hover:text-primary transition-colors duration-300 w-fit"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-5xl lg:text-3xl"
                  />
                </a>
              </div>
              <div className="flex w-full">
                <a
                  href="https://codetower.com.br"
                  className="bg-neutral-100 mt-8 hover:bg-primary w-full lg:w-fit hover:text-neutral-100 text-center text-lg uppercase font-semibold transition-colors duration-300 py-3 px-8"
                  target="_blank"
                  rel="noreferrer"
                >
                  Acessar
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 lg:bg-neutral-900/60 flex items-center justify-center py-20 px-10">
          <div className="relative aspect-square h-96">
            <Image src="/img/Code_Tower_logo2.png" layout="fill" />
          </div>
        </div>
      </div>
    </Banner>
  );
}
