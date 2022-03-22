import Banner from '@/components/layout/Banner';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset } from '@/utils';
import FeatureSection from '@/components/home/FeatureSection';
import CourseSection from '@/components/home/CourseSection';
import RecentPostsSection from '@/components/home/RecentPostsSection';
import Link from 'next/link';
import ProfessorsSection from '@/components/home/ProfessorsSection';

export async function getServerSideProps({}) {
  const query = gql`
      {
          professors(filter: {institution: {_eq: "IFG"}, status: {_eq: "published"}}) {
              degree
              institution
              lattes
              name
              avatar {
                  id
              }
              id
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

  const { home_page, recent_article, professors } = (await client.query({
    query: query
  })).data;

  const carousel = home_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description,
    tags: item.directus_files_id.tags
  }));

  return {
    props: {
      recent_article,
      professors,
      page: {
        ...home_page,
        carousel
      }
    }
  };
}

export default function Home({ page, recent_article: recentPosts, professors }) {
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
      <FeatureSection className='mb-20' />
      <ProfessorsSection className='mb-20' professors={professors} />
      <CourseSection className='mb-20' />
      <RecentPostsSection className='mb-20' posts={recentPosts} />

      <div className='bg-primary'>
        <div className='container flex py-20'>
          <div className='w-full lg:w-8/12'>
            <p className='text-4xl font-bold text-white capitalize'>Not yet satisfied with our trend?</p>
          </div>
          <div className='w-full lg:w-4/12'>
            <Link href='/blog'>
              <a
                className='bg-white py-2 px-4 uppercase float-right font-medium font-sm hover:text-primary transition-colors duration-300'>view
                our
                blog</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
