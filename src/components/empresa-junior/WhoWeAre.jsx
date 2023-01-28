import Container from '@/components/layout/Container';
import Image from 'next/image';

export default function WhoWeAre({ className }) {
  return (
    <>
      <Container className="lg:flex lg:flex-row lg:space-x-28 lg:justify-between lg:items-center">
        <div>
          <h2 className="font-bold text-4xl mb-8 flex-none">
            O que é a Code Tower?
          </h2>
          <div>
            <p>
              {' '}
              A Code Tower é uma empresa junior especializada no desenvolvimento
              de sites, sistemas web e de aplicativos, desde o mais simples até
              um empresarial.
            </p>
            <p>
              Nosso maior objetivo é preparar os seus membros para o ambiente do
              mercado de trabalho, oferecendo treinamento básico necessário para
              descobrir o seu potêncial como programador, designer e marketing.
              Se interessou? Venha fazer parte da nossa equipe!
            </p>
          </div>
        </div>
        <div className="relative flex-none w-0  lg:w-2/4">
          <Image
            src={'/img/Code_Tower_logo1.png'}
            className="self-center"
            width="584"
            height="255"
            layout="responsive"
          />
        </div>
      </Container>
    </>
  );
}
