import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';

export async function getServerSideProps(context) {
  const query = gql`
      query GecompPage {
          gecomp_page {
              areas
              description
              members {
                  professors_id {
                      name
                      lattes
                      institution
                      degree
                  }
              }
          }
      }
  `;

  const { data } = await client.query({
    query: query
  });

  const { gecomp_page } = data;
  const areas = gecomp_page.areas;
  const description = gecomp_page.description;
  const members = gecomp_page.members.map(item => ({
    name: item.professors_id.name,
    lattes: item.professors_id.lattes,
    institution: item.professors_id.institution,
    degree: item.professors_id.degree
  }));

  return {
    props: {
      areas, description, members
    } // will be passed to the page component as props
  };
}

export default function gecomp({ areas, description, members }) {
  const paths = [{ url: '/', label: 'home' }, { url: '/gecomp', label: 'gecomp', disabled: true }];
  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Grupo de Estudo e Pesquisa em Ciência
          da Computação</p>
      </BannerBreadcrumb>
      <Container>
        <div className='flex flex-wrap md:flex-nowrap gap-4'>
          <div className='w-full md:w-8/12 prose prose' dangerouslySetInnerHTML={{ __html: description }} />
          <div className='w-full md:w-4/12 flex flex-col gap-4'>
            <div className='bg-gray-50 px-2 py-3 w-full'>
              <p className='text-lg font-semibold mx-4'>Professores Integrantes</p>
              <ul
                className='w-full text-sm font-medium text-gray-900 rounded-lg list-none'>
                {
                  members.map((member, index) =>
                    <li key={member.name}
                        className={`py-2 px-4 w-full underline hover:text-primary transition-color duration-300 ${index !== members.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <a href='member.lattes' target='_blank'>{member.degree}{' '}
                        {member.name} ({member.institution})</a>
                    </li>
                  )
                }
              </ul>
            </div>

            <div className='bg-gray-50 px-2 py-3 w-full'>
              <p className='text-lg font-semibold mx-4'>Linhas de Pesquisa</p>
              <ul
                className='w-full text-sm font-medium text-gray-900 rounded-lg list-none'>
                {
                  areas.map((area, index) => (
                    <li key={index}
                        className={`py-2 px-4 w-full ${index !== members.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      {area}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}