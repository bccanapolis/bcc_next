import Container from '@/components/layout/Container';
import Image from 'next/image';

export default function Service({ services }) {
  return (
    <Container>
      <h2 className='font-bold text-4xl mb-16'>Serviços Prestados</h2>
      <div className='grid grid-cols-1 lg:space-y-0 lg:grid-cols-3 gap-12'>
        {
          services.map((service, index) => (
            <div key={index}>
              <div className='relative '>
                <Image src={service.photo} width='359' height='359' layout='responsive' />
              </div>
              <div className='mt-2 p-2'>
                <h5 className='text-xl font-bold tracking-tight text-neutral-900'>
                  {service.title}</h5>
                <p>{service.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </Container>
  );
}