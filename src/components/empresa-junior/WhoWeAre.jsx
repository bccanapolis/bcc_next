import Container from '@/components/layout/Container';
import Image from 'next/image';
export default function WhoWeAre({ className })
{
  return (
    <>
      <Container>
        <div className='grid grid-cols-1 lg:grid-cols-2 space-x-28 justify-between'>
          <div>
            <h2 className='font-bold text-3xl mb-8'>O que é a Code Tower?</h2>
            <div >
              <p className='text-xl'> A Code Tower é uma empresa junior especializada no desenvolvimento de sites, sistemas web e de aplicativos, desde o mais simples até um empresarial.</p>
              <p className='text-xl'>Nosso maior objetivo é preparar os seus membros para o ambiente do mercado de trabalho, oferecendo treinamento básico necessário para descobrir o seu potêncial como programador, designer e marketing. Se interessou? Venha fazer parte da nossa equipe!</p>
            </div>
          </div>
          <div className='relative'>
            <Image src={'/img/Code_Tower_logo1.png'} className='self-center' layout='fill'/>
          </div>
        </div>

      </Container>
    </>
  )
}