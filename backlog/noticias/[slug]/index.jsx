import Container from '@/components/layout/Container';
import client from '@/apollo-client';
import Markdown from '@/components/Markdown';
import Banner from '@/components/layout/Banner';
import { apiAsset, clearObject } from '@/utils';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import HeadSeo from '@/components/layout/HeadSeo';
import ArticlePanel from '@/components/article/ArticlePanel';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { gql } from '@apollo/client';
import { ptBR } from 'date-fns/locale';

export async function getServerSideProps(context) {
  const [slug, , id] = context.params.slug.split(/(@)(?!.*@)/);

  const variables = {
    id,
  };

  const query = gql`
    query BlogArticle($id: ID!) {
      recent_news: news(
        limit: 5
        page: 1
        sort: "-date_created"
        filter: { status: { _eq: "published" } }
      ) {
        user_created {
          avatar {
            id
          }
          id
          first_name
          last_name
          title
          description
        }
        id
        title
        cover {
          id
        }
        date_created
      }
      news_by_id(id: $id) {
        content
        cover {
          id
          title
        }
        user_created {
          avatar {
            id
          }
          id
          first_name
          last_name
          title
          description
        }
        date_created
        date_updated
        description
        id
        title
      }
    }
  `;

  const { news_by_id, recent_news } = (
    await client.query({
      query,
      variables,
    })
  ).data;

  return {
    props: {
      news: news_by_id,
      recent_news,
      page: {
        id,
        slug,
      },
    },
  };
}

export default function Index({ news, recent_news: recentPosts }) {
  const cover = !!news.cover
    ? [{ url: apiAsset(news.cover.id), alt: news.cover.title }]
    : null;
  const router = useRouter();

  function searchPosts({ search = '' }) {
    const query = {
      search,
    };

    router.push({
      pathname: '/noticias',
      query: clearObject(query),
    });
  }

  const keywords = [
    'computação ifg',
    'artigo publicado',
    'aluno da computacao',
  ];

  return (
    <>
      <HeadSeo
        title={`${news.title}`}
        description={news.description}
        openGraph={news.cover}
        keywords={keywords.join(', ')}
      />
      <Banner images={cover} className="h-96" overlay={false} />
      <Container className="flex flex-col-reverse lg:flex-row w-full gap-16 lg:gap-x-8">
        <main className="w-full lg:w-8/12 2xl:w-9/12">
          <h5 className="font-bold text-2xl mb-4">{news.title}</h5>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div className="inline-flex items-center space-x-2">
              <div className="inline-block text-left">
                <p className="flex font-light items-center gap-x-2 text-sm">
                  <CalendarIcon className="w-4 h-4 inline" /> Postado em{' '}
                  {format(new Date(news.date_created), 'dd MMM, yyyy', {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <Markdown className="prose prose-neutral">{news.content}</Markdown>
        </main>
        <ArticlePanel
          searchPosts={searchPosts}
          recentPosts={recentPosts}
          className="w-full lg:w-4/12 2xl:w-3/12"
          isNews={true}
        />
      </Container>
    </>
  );
}
