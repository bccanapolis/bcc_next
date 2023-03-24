import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import apolloClient from '@/apollo-client';
import { gql } from '@apollo/client';
import { apiAsset } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';
import Image from 'next/image';
import { fullName, sortByFullName } from '@/utils/user';
import Link from 'next/link';
import slugify from 'slugify';

export default function index({ page, professors }) {
  const paths = [
    { url: '/', label: 'home' },
    { url: '', label: 'pessoas', disabled: true },
    {
      url: ``,
      label: 'Professores',
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

      <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 ">
        {professors.map((item, index) => (
          <Link
            key={`professores-${item.lattes}`}
            href={`/pessoas/professores/${slugify(
              fullName(item.user).toLowerCase()
            )}.${item.lattes}`}
          >
            <a className="flex flex-col items-center group">
              <div className="relative overflow-hidden w-48 rounded-full h-48 mb-4">
                <Image
                  src={
                    item.user.avatar
                      ? apiAsset(item.user.avatar.id)
                      : '/img/open_graph_squared.png'
                  }
                  className="object-cover rounded-full group-hover:scale-[105%] transition-transform duration-300"
                  layout="fill"
                />
              </div>
              <p className="text-center group-hover:text-primary transition-colors duration-300">
                <span className="capitalize">{item?.degree}.</span>{' '}
                {fullName(item.user)}
              </p>
            </a>
          </Link>
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const query = gql`
    {
      professores_page {
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
            description
            tags
          }
        }
      }
      professor(filter: { institution: { _eq: "ifg" } }) {
        id
        institution
        degree
        lattes
        user {
          email
          first_name
          last_name
          avatar {
            height
            id
            width
          }
        }
      }
    }
  `;

  const res = (await apolloClient.query({ query })).data;

  const { professor, professores_page } = res;

  const carousel = professores_page.hero_carousel
    ? professores_page.hero_carousel.map((item) => ({
        url: apiAsset(item.directus_files_id.id),
        alt: item.directus_files_id.description,
      }))
    : [];

  return {
    props: {
      professors: sortByFullName(professor),
      page: {
        ...professores_page,
        carousel,
      },
    },
    revalidate: 60 * 60,
  };
}
