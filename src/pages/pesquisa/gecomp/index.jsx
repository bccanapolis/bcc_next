import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';
import { fullName, sortByFullName, urlLattes } from '@/utils/user';


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
          className='text-5xl text-neutral-100 text-center uppercase font-semibold'>{page.hero_title || 'Hero Title'}</p>
      </BannerBreadcrumb>
      <Container>
        <div className='flex flex-wrap md:flex-nowrap gap-4'>
          <div className='w-full md:w-8/12 prose prose-neutral'
               dangerouslySetInnerHTML={{ __html: page.description }} />


          <div className='w-full md:w-4/12 flex flex-col gap-4'>
            {
              !!page.members &&
              <div className='bg-neutral-50 px-2 w-full'>
                <p className='text-lg font-semibold mx-4'>Professores Integrantes</p>
                <ul
                  className='w-full text-sm font-medium text-neutral-900 rounded-lg list-none'>
                  {
                    page.members.map((member, index) =>
                      <li key={member.user.lattes}
                          className={`py-2 px-4 w-full underline hover:text-primary transition-color duration-300 ${index !== page.members.length - 1 ? 'border-b border-text-neutral-300' : ''}`}>
                        <a href={urlLattes(member.user.lattes)} target='_blank'
                           rel='noopener noreferrer'>{member.degree}{' '}
                          {fullName(member.user)} ({member.institution})</a>
                      </li>
                    )
                  }
                </ul>
              </div>
            }
            {
              !!page.areas &&
              <div className='bg-neutral-50 px-2 w-full'>
                <p className='text-lg font-semibold mx-4'>Linhas de Pesquisa</p>
                <ul
                  className='w-full text-sm font-medium text-neutral-900 rounded-lg list-none'>
                  {
                    page.areas.map((area, index) => (
                      <li key={index}
                          className={`py-2 px-4 w-full ${index !== page.areas.length - 1 ? 'border-b border-text-neutral-300' : ''}`}>
                        {area}
                      </li>
                    ))
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps({}) {
  const query = gql`
      {
          gecomp_page {
              areas
              content
              members(filter: {professors_id: {gecomp: {_eq: true}}}) {
                  professors_id {
                      user {
                          first_name
                          last_name
                          lattes
                      }
                      institution
                      degree
                  }
              }
              hero_carousel {
                  directus_files_id {
                      id
                      description
                  }
              }
              hero_title
              seo_title
              seo_keywords
              seo_description
              seo_image {
                  id
                  width
                  height
              }
          }
      }
  `;

  const { gecomp_page } = (await client.query({
    query: query
  })).data;

  const areas = gecomp_page.areas;
  const description = gecomp_page.content;
  const members = gecomp_page.members.map(item => ({
    ...item.professors_id
  }));

  const carousel = gecomp_page.hero_carousel ? gecomp_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description
  })) : [];

  return {
    props: {
      page: {
        ...gecomp_page,
        areas, description, members: sortByFullName(members), carousel
      }
    }// will be passed to the page component as props
  };
}
