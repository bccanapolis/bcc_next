import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';

export async function getServerSideProps({}) {
  const query = gql`
      {
          gecomp_page_files {
              directus_files_id {
                  id,
                  title
                  description
              }
          }
          gecomp_page {
              areas
              content
              members {
                  professors_id {
                      name
                      lattes
                      institution
                      degree
                  }
              }
              hero_title
              seo_title
              seo_keywords
              seo_description
              seo_image {
                  title
                  description
                  id
              }
          }
      }
  `;

  const { data } = await client.query({
    query: query
  });

  const { gecomp_page } = data;
  const areas = gecomp_page.areas;
  const description = gecomp_page.content;
  const members = gecomp_page.members.map(item => ({
    name: item.professors_id.name,
    lattes: item.professors_id.lattes,
    institution: item.professors_id.institution,
    degree: item.professors_id.degree
  }));

  const carousel = data.gecomp_page_files.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description
  }));

  return {
    props: {
      page: {
        ...gecomp_page,
        areas, description, members, carousel
      }
    } // will be passed to the page component as props
  };
}

export default function index({ page }) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'pesquisa', disabled: true }, {
    url: '',
    label: 'gecomp',
    disabled: true
  }];
  return (
    <>
      <HeadSeo title={page.seo_title} description={page.seo_description} keywords={page.seo_keywords}
               openGraph={page.seo_image} />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{page.hero_title || 'GRUPO DE ESTUDO E PESQUISA EM CIÊNCIA DA COMPUTAÇÃO'}</p>
      </BannerBreadcrumb>
      <Container>
        <div className='flex flex-wrap md:flex-nowrap gap-4'>
          <div className='w-full md:w-8/12 prose' dangerouslySetInnerHTML={{ __html: page.description }} />
          <div className='w-full md:w-4/12 flex flex-col gap-4'>
            <div className='bg-gray-50 px-2 py-3 w-full'>
              <p className='text-lg font-semibold mx-4'>Professores Integrantes</p>
              <ul
                className='w-full text-sm font-medium text-gray-900 rounded-lg list-none'>
                {
                  page.members.map((member, index) =>
                    <li key={member.name}
                        className={`py-2 px-4 w-full underline hover:text-primary transition-color duration-300 ${index !== page.members.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <a href={member.lattes} target='_blank' rel='noopener noreferrer'>{member.degree}{' '}
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
                  page.areas.map((area, index) => (
                    <li key={index}
                        className={`py-2 px-4 w-full ${index !== page.areas.length - 1 ? 'border-b border-gray-200' : ''}`}>
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