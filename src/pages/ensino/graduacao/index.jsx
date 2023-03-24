import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import { apiAsset } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';

export async function getServerSideProps() {
  const query = gql`
    {
      graduacao_page {
        content
        hero_title
        seo_title
        seo_keywords
        seo_description
        seo_image {
          id
          width
          height
        }
        hero_carousel {
          directus_files_id {
            id
            tags
            description
          }
        }
      }
    }
  `;

  const { graduacao_page } = (await client.query({ query })).data;

  const carousel = graduacao_page.hero_carousel
    ? graduacao_page.hero_carousel.map((item) => ({
        url: apiAsset(item.directus_files_id.id),
        alt: item.directus_files_id.description,
      }))
    : [];

  return {
    props: {
      page: { ...graduacao_page, carousel },
    },
  };
}

export default function index({ page }) {
  const paths = [
    { url: '/', label: 'home' },
    { url: '', label: 'ensino', disabled: true },
    {
      url: `/ensino/graduacao`,
      label: 'graduação',
      disabled: true,
    },
  ];

  return (
    <>
      <HeadSeo
        title={page.seo_title}
        description={page.seo_description}
        openGraph={page.seo_image}
        keywords={page.seo_keywords}
      />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p className="text-5xl text-neutral-100 text-center uppercase font-semibold">
          {page.hero_title || 'Hero Title'}
        </p>
      </BannerBreadcrumb>
      <Container className="space-y-4">
        <div
          className="prose prose-neutral"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </Container>
    </>
  );
}
