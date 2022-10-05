import Container from '@/components/layout/Container';
import { queryArticleByID } from '@/graphql/query/blog';
import client from '@/apollo-client';
import Markdown from '@/components/Markdown';
import Banner from '@/components/layout/Banner';
import { apiAsset, clearObject, urlSlugID } from '@/utils';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import HeadSeo from '@/components/layout/HeadSeo';
import ArticlePanel from '@/components/article/ArticlePanel';
import { CalendarIcon, UserIcon } from '@heroicons/react/outline';


export default function Index({ article, available_tags: tags, recent_article: recentPosts }) {
  const cover = !!article.cover ? [{ url: apiAsset(article.cover.id), alt: article.cover.title }] : null;
  const router = useRouter();

  function searchPosts({ tags = '', author = '', search = '' }) {
    const query = {
      tags,
      author,
      search
    };

    router.push({
      pathname: '/blog',
      query: clearObject(query)
    });
  }

  const keywords = [
    'computação ifg',
    'artigo publicado',
    'aluno da computacao',
    ...article.tags
  ];

  article.user_created.full_name = `${article.user_created.first_name} ${article.user_created.last_name}`;

  return (
    <>
      <HeadSeo title={`${article.title} - ${article.user_created.full_name}`} description={article.description}
               openGraph={article.cover} keywords={keywords.join(', ')} />
      <Banner images={cover} className='h-96' overlay={false} />
      <Container className='flex flex-col-reverse lg:flex-row w-full gap-16 lg:gap-x-8'>
        <main className='w-full lg:w-8/12 2xl:w-9/12 '>
          <h5 className='font-bold text-2xl mb-4'>{article.title}</h5>
          <div className='flex flex-col md:flex-row justify-between md:items-end gap-4'>
            <div
              className='inline-flex items-center space-x-2'>
              {/*<div className='relative w-12 h-12 inline-block rounded-full'>*/}
              {/*  <Image*/}
              {/*    src={apiAsset(article.user_created.avatar.id)} className='object-cover rounded-full'*/}
              {/*    layout='fill' />*/}
              {/*</div>*/}
              <div className='inline-block text-left'>
                <p className='flex font-medium items-center gap-x-2'><UserIcon
                  className='w-4 h-4 inline' /> {article.user_created.full_name}</p>
                <p className='flex font-light items-center gap-x-2 text-sm'><CalendarIcon
                  className='w-4 h-4 inline' /> Postado
                  em {format(new Date(article.date_created), 'dd MMM, yyyy')}</p>
              </div>
            </div>
            <ul className='inline-flex gap-x-1'>
              {
                !!article.tags &&
                article.tags.map(({ article_tags_id: item }) => (
                  <li key={`tag-post-${article.slug}-${item.name}`}
                      className='text-sm text-neutral-700 px-1 py-0.5'>
                    {item.name}
                  </li>
                ))
              }
            </ul>
          </div>

          <hr className='my-4' />
          <Markdown className='prose prose-neutral'>{article.content}</Markdown>
        </main>
        <ArticlePanel searchPosts={searchPosts} pageAuthors={[article.user_created]} recentPosts={recentPosts}
                      tags={tags}
                      className='w-full lg:w-4/12 2xl:w-3/12 ' />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const [slug, , id] = urlSlugID(context.params.slug);

  const variables = {
    id
  };

  const query = queryArticleByID;

  const { article_by_id, recent_article, article_tags } = (await client.query({
    query, variables
  })).data;

  let available_tags = article_tags.map(({ name }) => name);

  return {
    props: {
      article: article_by_id,
      recent_article,
      available_tags,
      page: {
        id, slug
      }
    }
  };
}
