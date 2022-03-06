import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import Container from '@/components/layout/Container';

export async function getServerSideProps({ query }) {
  const gQuery = gql`
      {
          game_aggregated(groupBy: "year") {
              group
          }
          game(filter: {year_func: {year: {_eq: ${query.year}}}}){
              id
              title
              video_url
              description
              author
              year
          }
      }
  `;

  const { game, game_aggregated } = (await client.query({ query: gQuery })).data;

  const years = game_aggregated.map(item => new Date(item.group.year).getFullYear());

  const games = game.map(item => {
    let url = item.video_url.split('/');
    url = url[url.length - 1];
    return {
      ...item,
      video_url: url
    };
  });

  return {
    props: { games, years }
  };
}

export default function GamesPage({ games, years }) {
  const router = useRouter();
  const { year } = router.query;

  const paths = [{ url: '/', label: 'home' }, { url: '/games', label: 'games', disabled: true }, {
    url: `/games/${year}`,
    label: year,
    disabled: true
  }];

  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Games {year}</p>
      </BannerBreadcrumb>
      <Container>
        <div className='prose'>
          <p>
            O curso Bacharelado em Ciência da Computação do IFG - Anápolis gentilmente vos convida para escolher os
            melhores games de {year}. </p>
          <p>
            Os jogos foram desenvolvidos pelos nossos queridos calouros, durante as disciplinas de Construção de
            Algoritmos e Laboratório de Programação. Os jogos servem como o propósito pedagógico para motivar os
            alunos durante a execução e aprendizado de programação/algoritmo.
          </p>
        </div>
      </Container>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full'>
          {
            games.map((game, index) => (
              <div key={index}
                   className='bg-white border border-gray-200'>
                <iframe src={`https://www.youtube.com/embed/${game.video_url}`}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        frameBorder='0' height='315'
                        title='YouTube video player'
                        width='100%'>
                </iframe>
                <div className='p-5 flex flex-col justify-between'>
                  <div>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      {game.title}</h5>
                    <h6
                      className='mb-2 text-lg tracking-tight text-gray-500 dark:text-white'>{game.author}</h6>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{game.description}</p>
                  </div>
                  {/*<div>*/}
                  {/*  <button*/}
                  {/*    className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 group focus:ring-4 focus:ring-red-300 uppercase'*/}
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