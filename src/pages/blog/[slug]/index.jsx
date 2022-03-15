import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { queryArticleByID } from '@/graphql/query/blog';
import client from '@/apollo-client';
import Markdown from '@/components/Markdown';
import Banner from '@/components/layout/Banner';
import { apiAsset, clearObject } from '@/utils';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import HeadSeo from '@/components/layout/HeadSeo';

export async function getServerSideProps(context) {
  const [slug, , id] = context.params.slug.split(/(@)(?!.*@)/);

  const variables = {
    id
  };

  const query = queryArticleByID;

  const { article_by_id } = (await client.query({
    query, variables
  })).data;

  return {
    props: {
      article: article_by_id,
      page: {
        id, slug
      }
    }
  };
}

export default function Index({ article, page }) {
  const cover = !!article.cover ? [{ url: apiAsset(article.cover.id), alt: article.cover.title }] : null;
  const router = useRouter();

  // const paths = [
  //   { url: '/', label: 'home' },
  //   { url: '/blog', label: 'blog' },
  //   { url: '', label: 'artigo', disabled: true }
  // ];
  function searchPosts({ tags = '', author = '' }) {
    const query = {
      tags,
      author
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
      <Container className='max-w-screen-lg sm:px-4'>

        <h5 className='font-bold text-2xl mb-4'>{article.title}</h5>
        <div className='flex flex-col md:flex-row justify-between md:items-end gap-4'>
          <button onClick={() => searchPosts({ author: article.user_created.id })}
                  className='inline-flex items-center space-x-2'>
            <div className='relative w-12 h-12 inline-block rounded-full'>
              <Image
                src={apiAsset(article.user_created.avatar.id)} className='object-cover rounded-full'
                layout='fill' />
            </div>
            <div className='inline-block text-left'>
              <p
                className='font-medium'>{article.user_created.full_name}</p>
              <p className='text-sm'>Postado em {format(new Date(article.date_created), 'dd MMM yyyy')}</p>
            </div>
          </button>
          <ul className='inline-flex gap-x-1'>
            {
              !!article.tags &&
              article.tags.map(item => (
                <li key={`tag-post-${article.slug}-${item}`}>
                  <button onClick={() => searchPosts({ tags: item })}
                          className='text-sm text-neutral-500 bg-primary/20 px-1 py-0.5 hover:text-primary  hover:bg-primary/30 transition-colors duration-300'>{item}</button>
                </li>
              ))
            }
          </ul>
        </div>

        <hr className='my-4' />
        <Markdown className='prose prose-neutral'>{article.content}</Markdown>
      </Container>
      <Container className='max-w-screen-md'>
        {/*<div className='prose' dangerouslySetInnerHTML={{ __html: article.content }} />*/}
      </Container>
    </>
  );
}