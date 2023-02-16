import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export const dynamicNews = (page, limit, search = '') => {
  const query = {
    query: {
      recent_news: {
        __aliasFor: 'news',
        __args: {
          limit: 6,
          page: 1,
          sort: '-published_at'
        },
        id: true,
        title: true,
        cover: true,
        link: true,
        description: true,
        published_at: true
      },
      featured_news: {
        __aliasFor: 'news',
        __args: {
          limit: 6,
          page: 1,
          sort: '-published_at',
          filter: {
            featured: {
              _eq: true
            }
          }
        },
        id: true,
        title: true,
        cover: true,
        link: true,
        description: true,
        published_at: true
      },
      news: {
        __args: {
          limit,
          page,
          search,
          sort: '-published_at'
        },
        id: true,
        title: true,
        link: true,
        description: true,
        cover: true,
        published_at: true
      },
      news_aggregated: {
        count: {
          id: true
        }
      }
    }
  };

  return jsonToGraphQLQuery(query);
};