import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import Container from '@/components/layout/Container';
import { apiAsset, stringBind } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';

export async function getServerSideProps({ query }) {
  const gQuery = gql`
      query GamePage($year: Float){
          games_page {
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
                      description
                      tags
                  }
              }
          }
          game(filter: {year_func: {year: {_eq: $year}}}){
              id
              title
              video_url
              description
              author
              year
          }
      }
  `;

  const { game, games_page } = (await client.query({
    query: gQuery, variables: {
      year: parseFloat(query.year)
    }
  })).data;

  const games = game.map(item => {
    let url = item.video_url.split('/');
    url = url[url.length - 1];
    return {
      ...item,
      video_url: url
    };
  });

  const carousel = games_page.hero_carousel ? games_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description,
    tags: item.directus_files_id.tags
  })) : null;

  return {
    props: { games, page: { ...games_page, carousel } }
  };
}

export default function GamesPage({ games, page }) {
  const router = useRouter();
  const { year } = router.query;

  const paths = [{ url: '/', label: 'home' }, { url: '/games', label: 'games', disabled: true }, {
    url: `/games/${year}`,
    label: year,
    disabled: true
  }];

  return (
    <>
      <HeadSeo title={page.seo_title} description={page.seo_description} openGraph={page.seo_image}
               keywords={page.seo_keywords} />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{page.hero_title ? stringBind(page.hero_title, 'year', year) : `Games ${year}`} </p>
      </BannerBreadcrumb>
      <Container>
        <div className='prose prose-neutral'
             dangerouslySetInnerHTML={{
               __html: stringBind(page.content, 'year', year)
             }} />
      < /Container>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full'>
          {
            games.map((game, index) => (
              <div key={index}
                   className='bg-white border border-neutral-200'>
                <iframe src={`https://www.youtube.com/embed/${game.video_url}`}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        frameBorder='0' height='315'
                        title='YouTube video player'
                        width='100%'>
                </iframe>
                <div className='p-5 flex flex-col justify-between'>
                  <div>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-neutral-900'>
                      {game.title}</h5>
                    <h6
                      className='mb-2 text-lg tracking-tight text-neutral-500'>{game.author}</h6>
                    <p className='font-normal text-neutral-700'>{game.description}</p>
                  </div>
                  {/*<div>*/}
                  {/*  <button*/}
                  {/*    className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-neutral-900 bg-neutral-100 group focus:ring-4 focus:ring-red-300 uppercase'*/}
                  {/*    href='#'>*/}
                  {/*    <span>Votar</span>*/}
                  {/*    <HeartIcon className='ml-2 w-6 h-6 text-red-400 group-hover:text-red-600' />*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
              </div>
            ))
          }
        </div>
      </Container>
    </>
  );
}