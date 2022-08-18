import Link from 'next/link';
import slugify from 'slugify';
import { fullName } from '@/utils/user';
import Image from 'next/image';
import { apiAsset } from '@/utils';
import Container from '@/components/layout/Container';
import { Img } from 'react-image';

export default function Service({ services })
{
  return(
    <Container >
      <h2 className="font-bold text-3xl mb-16">Serviços Prestados</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-28'>
        {
          services.map((service, index) => (
            <div key={index}>
              <Img src={service.photo}/>
              <div className='p-4'>
                <div>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-neutral-900'>
                    {service.title}</h5>
                  <p className='font-normal text-neutral-700'>{service.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Container>
  )
}