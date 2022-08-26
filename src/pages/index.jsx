import Banner from '@/components/layout/Banner';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';
import FeatureSection from '@/components/home/FeatureSection';
import CourseSection from '@/components/home/CourseSection';
import RecentPostsSection from '@/components/home/RecentPostsSection';
import ProfessorsSection from '@/components/home/ProfessorsSection';
import GameSection from '@/components/home/GameSection';
import { sortByFullName } from '@/utils/user';

export async function getStaticProps({}) {
  const query = gql`
      {
          game_aggregated(groupBy: "year"){
              group
          }
          professors(filter: { institution: {_eq: "IFG"}, status: {_eq: "published"}}) {
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
          recent_article: article (limit: 5, page: 1, sort: "-date_created", filter: {status: {_eq: "published"}}) {
              user_created {
                  first_name
                  last_name
              }
              id
              title
              cover {
                  id
              }
              slug
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

  const { home_page, recent_article, professors, game_aggregated } = (await client.query({
    query: query
  })).data;

  const years = game_aggregated.map(item => new Date(item.group.year).getFullYear()).sort().reverse();

  const carousel = home_page.hero_carousel ? home_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description,
    tags: item.directus_files_id.tags
  })) : [];

  return {
    props: {
      recent_article,
      professors: sortByFullName(professors),
      games: years,
      page: {
        ...home_page,
        carousel
      }
    },
    revalidate: 60 * 60
  };
}

export default function Home({ page, recent_article: recentPosts, professors, games }) {
  return (
    <>
      <HeadSeo title={page.seo_title || 'IFG Câmpus Anápolis'} description={page.seo_description}
               openGraph={page.seo_image} keywords={page.seo_keywords} />
      <Banner fullscreen={true} navigation={false} imageLoading='eager'
              images={!!page.carousel.length ? page.carousel : null}>
        <div className='container'>
          <div className='sm:-mt-20 sm:-ml-4 relative h-48 w-full sm:w-[360px]'
          >
            <Image
              src='/img/bcc_anapolis_logo.svg'
              layout='fill'
            />
          </div>

        </div>
      </Banner>
      {
        page.secao_feature_display && <FeatureSection
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
          className='mb-20' />
      }
      {
        page.secao_professores_display && <ProfessorsSection
          section={{
            title: page.secao_professores_title,
            subtitle: page.secao_professores_subtitle
          }}
          className='mb-20 mt-20' professors={professors} />
      }
      {/* <CourseSection className='mb-20' /> */}
      {
        page.secao_posts_display && <RecentPostsSection
          section={{
            title: page.secao_posts_title,
            subtitle: page.secao_posts_subtitle
          }}
          className='mb-20' posts={recentPosts} />
      }

      {
        page.secao_games_display &&
        <GameSection section={{ title: page.secao_games_title, subtitle: "Jogos desenvolvidos pelos nossos queridos calouros, durante as disciplinas de Construção de Algoritmos e Laboratório de Programação" }} games={games} className='mb-20' />
      }
    </>
  );
}
