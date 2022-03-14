import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { queryArticleByID } from '@/graphql/query/blog';
import client from '@/apollo-client';
import Markdown from '@/components/Markdown';

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

export default function index({ article, page }) {
  const paths = [
    { url: '/', label: 'home' },
    { url: '/blog', label: 'blog' },
    { url: '', label: 'artigo', disabled: true }
  ];
  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{article.title}</p>
      </BannerBreadcrumb>
      <Container>
        <Markdown className='prose prose-neutral'>{article.content}</Markdown>
        {/*<div className='prose' dangerouslySetInnerHTML={{ __html: article.content }} />*/}
      </Container>
    </>
  );
}