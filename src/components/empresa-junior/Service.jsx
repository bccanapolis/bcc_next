import Container from '@/components/layout/Container';
import Image from 'next/image';

export default function Service({ services })
{
  return(
    <Container >
      <h2 className='font-bold text-3xl mb-16'>Serviços Prestados</h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-28'>
        {
          services.map((service, index) => (
            <div key={index}>
              <div className='relative h-96 w-96'>
                <Image src={service.photo} layout='fill'/>
              </div>
              <div className='p-4'>
                <div>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-neutral-900'>
                    {service.title}</h5>
                  <p className='font-normal text-neutral-700 w-96'>{service.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Container>
  )
}