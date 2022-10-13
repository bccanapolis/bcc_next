import Container from '@/components/layout/Container';
import Image from 'next/image';

export default function Service({ services })
{
  return(
    <Container >
      <h2 className='font-bold text-3xl mb-16'>Serviços Prestados</h2>
      <div className='grid grid-cols-1 space-y-12 lg:space-y-0 lg:grid-cols-3 gap-x-24 '>
        {
          services.map((service, index) => (
            <div key={index}>
              <div className='relative '>
                <Image src={service.photo} width='359' height='359' layout='responsive'/>
              </div>
              <div className='pl-4'>
                <div>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-neutral-900'>
                    {service.title}</h5>
                  <p className='font-normal text-neutral-700  break-normal'>{service.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Container>
  )
}