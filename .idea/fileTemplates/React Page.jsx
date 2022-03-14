import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';

export async function getServerSideProps({}) {
  const query = gql``;

  const response = (await client.query({
    query: query
  })).data;

  return {
    props: {
      page: response
    }
  };
}

export default function ${NAME}({ page }) {
  const paths = [
  { url: '/', label: 'home' },
  { url: '', label: '', disabled: true },
  { url: '', label: '', disabled: true  }
  ];
  return (
    <>
      <HeadSeo title={page.seo_title} description={page.seo_description}
               openGraph={page.seo_image} keywords={page.seo_keywords} />
      <BannerBreadcrumb paths={paths} images={!!page.carousel.length ? page.carousel : null}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{page.hero_title || ''}</p>
      </BannerBreadcrumb>
      <Container>
        <p>Hello</p>
      </Container>
    </>
  );
}