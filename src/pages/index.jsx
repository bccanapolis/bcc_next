import Banner from '@/components/layout/Banner';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';
import FeatureSection from '@/components/home/FeatureSection';
import RecentPostsSection from '@/components/home/RecentPostsSection';
import { sortByFullName } from '@/utils/user';
import CodeBannerSection from '@/components/home/CodeBannerSection';
import ProjectsBanner from '@/components/home/ProjectsBanner';
import Link from 'next/link';
import GenericBanner from '@/components/GenericBanner';
import RecentNews from '@/components/news/RecentNews';

export async function getStaticProps({}) {
  const query = gql`
      {
          news(limit: 4, page: 1, sort: "-published_at") {
              id
              title
              cover
              description
              link
              published_at
          }
          projetos_page {
              content
              hero_carousel {
                  directus_files_id {
                      id
                      description
                      tags
                  }
              }
          }
          game_aggregated(groupBy: "year", sort: "-year") {
              group
          }
          professor(filter: { institution: { _eq: "IFG" } }) {
              id
              institution
              degree
              user {
                  email
                  first_name
                  last_name
                  lattes
                  avatar {
                      height
                      id
                      width
                  }
              }
          }
          recent_article: article(
              limit: 4
              page: 1
              sort: "-date_created"
              filter: { status: { _eq: "published" } }
          ) {
              user_created {
                  first_name
                  last_name
              }
              id
              title
              cover {
                  id
              }
              description
              date_created
          }
          home_page {
              seo_keywords
              seo_title
              seo_description
              seo_image {
                  id
                  width
                  height
              }
              secao_feature_display
              secao_professores_display
              secao_professores_title
              secao_professores_subtitle
              secao_posts_display
              secao_posts_title
              secao_posts_subtitle
              secao_feature_1_description
              secao_feature_1_link
              secao_feature_1_title
              secao_feature_2_description
              secao_feature_2_link
              secao_feature_2_title
              secao_feature_3_description
              secao_feature_3_link
              secao_feature_3_title
              secao_games_title
              secao_games_display
              secao_games_subtitle
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

  const {
    home_page,
    recent_article,
    professor,
    game_aggregated,
    projetos_page,
    news
  } = (
    await client.query({
      query: query
    })
  ).data;

  const years = game_aggregated.map((item) => item.group.year);

  const carousel = home_page.hero_carousel
    ? home_page.hero_carousel.map((item) => ({
      url: apiAsset(item.directus_files_id.id),
      alt: item.directus_files_id.description,
      tags: item.directus_files_id.tags
    }))
    : [];

  const projetosCarousel = projetos_page.hero_carousel
    ? projetos_page.hero_carousel.map((item) => ({
      url: apiAsset(item.directus_files_id.id),
      alt: item.directus_files_id.description,
      tags: item.directus_files_id.tags
    }))
    : [];

  return {
    props: {
      recent_article,
      professors: sortByFullName(professor),
      games: years,
      projetosCarousel,
      projetosPage: projetos_page,
      news,
      page: {
        ...home_page,
        carousel
      }
    },
    revalidate: 60 * 60
  };
}

export default function Home({
                               page,
                               recent_article: recentPosts,
                               professors,
                               games,
                               projetosCarousel,
                               projetosPage,
                               news
                             }) {
  return (
    <>
      <HeadSeo
        title={page.seo_title || 'IFG Câmpus Anápolis'}
        description={page.seo_description}
        openGraph={page.seo_image}
        keywords={page.seo_keywords}
      />
      <Banner
        fullscreen={true}
        navigation={false}
        imageLoading='eager'
        images={!!page.carousel.length ? page.carousel : null}
      >
        <div className='container'>
          <div className='relative h-48 w-full sm:w-[360px]'>
            <Image src='/img/bcc_anapolis_logo.svg' layout='fill' />
          </div>
        </div>
      </Banner>
      {page.secao_feature_display && (
        <FeatureSection
          features={[
            {
              title: page.secao_feature_1_title,
              description: page.secao_feature_1_description,
              link: page.secao_feature_1_link
            },
            {
              title: page.secao_feature_2_title,
              description: page.secao_feature_2_description,
              link: page.secao_feature_2_link
            },
            {
              title: page.secao_feature_3_title,
              description: page.secao_feature_3_description,
              link: page.secao_feature_3_link
            }
          ]}
        />
      )}
      <GenericBanner
        className='mt-16 mb-0 text-neutral-100 p-0'
        section={{
          title: 'Estude Computação em uma instituição pública, federal e de qualdiade. Estude no IFG Campus Anápolis'
        }}

        images={[
          {
            url: '/img/open_graph_full.png',
            alt: 'IFG Câmpus Anápolis',
            tags: 'IFG Câmpus Anápolis'
          }]}
      >
        <div className='flex justify-center '>
          <Link href='/sobre'>
            <a
              className='text-neutral-100 bg-primary py-2 px-4 hover:bg-primary hover:text-neutral-100  transition-colors duration-300'>
              Saiba mais
            </a>
          </Link>
        </div>
      </GenericBanner>
      <CodeBannerSection className='mt-0' />

      <ProjectsBanner
        className='bg-primary text-white py-16'
        // images={projetosCarousel}
        section={{
          title: 'Projetos de Ensino',
          subtitle:
            'Nossos projetos de ensino convidam os alunos a resolver problemas reais e criar soluções tecnológicas incríveis.'
        }}
      />
      <div className='mt-20'>
        <RecentNews
          section={{
            title: 'Ultimas Notícias',
          }}
          posts={news}
          className={'mb-20'}
        />

        {page.secao_posts_display && (
          <RecentPostsSection
            section={{
              title: page.secao_posts_title,
              subtitle: page.secao_posts_subtitle
            }}
            posts={recentPosts}
            className={'mb-20'}
          />
        )}
        {/*{*/}
        {/*  page.secao_professores_display && <ProfessorsSection*/}
        {/*    section={{*/}
        {/*      title: page.secao_professores_title,*/}
        {/*      subtitle: page.secao_professores_subtitle*/}
        {/*    }}*/}
        {/*    className='mb-20 mt-20' professors={professors} />*/}
        {/*}*/}
        {/* <CourseSection className='mb-20' /> */}

        {/*{*/}
        {/*  page.secao_games_display &&*/}
        {/*  <GameBannerYears*/}
        {/*    section={{ title: page.secao_games_title ?? 'Section Title', subtitle: page.secao_games_subtitle }}*/}
        {/*    games={games}*/}
        {/*  />*/}
        {/*}*/}
      </div>
    </>
  );
}
