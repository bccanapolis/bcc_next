import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import poke from 'pokeipsum';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import { apiAsset } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';

export async function getServerSideProps() {
  const query = gql`
      {
          tecnico_integrado_page_files {
              directus_files_id {
                  id,
                  title
                  description
              }
          }
          tecnico_integrado_page {
              content
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

  const { tecnico_integrado_page, tecnico_integrado_page_files } = (await client.query({ query })).data;

  const carousel = tecnico_integrado_page_files.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description
  }));

  return {
    props: {
      page: {
        ...tecnico_integrado_page,
        carousel
      }
    }
  };
}

export default function index({ page }) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'ensino', disabled: true }, {
    url: ``,
    label: 'técnico integrado',
    disabled: true
  }];

  return (
    <>
      <HeadSeo title={page.seo_title} description={page.seo_description} keywords={page.seo_keywords}
               openGraph={page.seo_image} />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{page.hero_title || 'Curso Técnico Integrado'}</p>
      </BannerBreadcrumb>
      <Container className='space-y-4'>
        <div className='prose' dangerouslySetInnerHTML={{ __html: poke.paragraphs(8) }} />
      </Container>
    </>
  );
}