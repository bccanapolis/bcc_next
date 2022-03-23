import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export const dynamicNews = (page, limit, search = '', info = false) => {
  const query = {
    query: {
      recent_news: {
        __aliasFor: 'news',
        __args: {
          limit: 5,
          page: 1,
          sort: '-date_created',
          filter: {
            status: { _eq: 'published' }
          }
        },
        user_created: {
          avatar: {
            id: true
          },
          id: true,
          first_name: true,
          last_name: true,
          title: true,
          description: true
        },
        id: true,
        title: true,
        cover: {
          id: true
        },
        date_created: true
      },

      news: {
        __args: {
          limit,
          page,
          search,
          sort: '-date_created',
          filter: {
            status: { _eq: 'published' }
          }
        },
        user_created: {
          avatar: {
            id: true
          },
          id: true,
          first_name: true,
          last_name: true,
          title: true,
          description: true
        },
        id: true,
        title: true,
        description: true,
        cover: {
          id: true
        },
        date_created: true
      },
      news_aggregated: {
        __args: {
          filter: {
            status: {
              _eq: 'published'
            }
          }
        },
        count: {
          id: true
        }
      }
    }
  };

  if (info) {
    query.query.noticias_page = {
      hero_title: true,
      hero_carousel: {
        directus_files_id: {
          id: true,
          description: true,
          tags: true
        }
      },
      seo_keywords: true,
      seo_title: true,
      seo_description: true,
      seo_image: {
        id: true,
        width: true,
        height: true
      }
    };
  }

  return jsonToGraphQLQuery(query);
};