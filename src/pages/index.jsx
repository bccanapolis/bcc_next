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
              hero_carousel {
                  directus_files_id {
                      id
                      description
                      tags
                  }
              }
          }
      }
  `;

  const { home_page } = (await client.query({
    query: query
  })).data;

  const carousel = home_page.hero_carousel.map(item => ({
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
      <HeadSeo title={page.seo_title || 'IFG Câmpus Anápolis'} description={page.seo_description}
               openGraph={page.seo_image} keywords={page.seo_keywords} />
      <Banner fullscreen={true} images={!!page.carousel.length ? page.carousel : null}>
        <div className='container'>
          <Image
            src='/img/bcc_anapolis_logo.svg'
            className='-mt-12'
            width={540}
            height={120}
          />
        </div>
      </Banner>
    </>
  );
}
