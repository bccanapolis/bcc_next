import { Img } from 'react-image';
import { classNames } from '@/utils';
import Container from '@/components/layout/Container';

export default function WhoWeAre({ className })
{
  return (
    <>
      <Container>
        <div className='flex space-x-28 justify-between'>
          <div className='basis-5/12'>
            <h2 className='font-bold text-3xl mb-8'>O que é a Code Tower?</h2>
            <div >
              <p className='font-bold text-xl'> A Code Tower é uma empresa junior especializada no desenvolvimento de sites, sistemas web e de aplicativos, desde o mais simples até um empresarial.</p>
              <p className='font-bold text-xl'>Nosso maior objetivo é preparar os seus membros para o ambiente do mercado de trabalho, oferecendo treinamento básico necessário para descobrir o seu potêncial como programador, designer e marketing. Se interessou? Venha fazer parte da nossa equipe!</p>
            </div>
          </div>
          <div className='flex'>
            <Img src={'/img/Code_Tower_logo1.png'} className='self-center'/>
          </div>
        </div>

      </Container>
    </>
  )
}