import Banner from '@/components/layout/Banner';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';

export async function getServerSideProps({}) {
  const query = gql`
      {
          home_page {
              seo_keywords
              seo_title
              seo_description
              seo_image {
                  id
                  width
                  height
              }
          }
          home_page_files {
              directus_files_id {
                  id
                  description
                  tags
              }
          }
      }
  `;

  const { home_page, home_page_files } = (await client.query({
    query: query
  })).data;

  const carousel = home_page_files.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description,
    tags: item.directus_files_id.tags
  }));

  return {
    props: {
      page: {
        ...home_page,
        carousel
      }
    }
  };
}

export default function Home({ page }) {
  return (
    <>
      <HeadSeo title={page.seo_title} description={page.seo_description}
               openGraph={page.seo_image} keywords={page.seo_keywords} />
      <Banner fullscreen={true} images={!!page.carousel.length ? page.carousel : null}>
        <div className='container'>
          <Image
            src='/img/bcc_anapolis_logo.svg'
            width={600}
            height={120}
          />
        </div>
      </Banner>
    </>
  );
}
