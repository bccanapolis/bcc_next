import { gql } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export const dynamicBlog = (page, limit, tags = '', author = '', search = '') => {
  const query = {
    query: {
      article: {
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
        tags: true,
        slug: true,
        date_created: true
      },
      article_aggregated: {
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
      },
      article_tags: {
        __aliasFor: 'article_aggregated',
        __args: {
          groupBy: 'tags'
        },
        group: true
      }
    }
  };

  if (!!tags) {
    query.query.article.__args.filter.tags = {
      _contains: tags
    };
    query.query.article_aggregated.__args.filter.tags = {
      _contains: tags
    };
  }

  if (!!author) {
    query.query.article.__args.filter.user_created = {
      id: {
        _eq: author
      }
    };
    query.query.article_aggregated.__args.filter.user_created = {
      id: {
        _eq: author
      }
    };
  }

  return jsonToGraphQLQuery(query, { pretty: true });
};

export const queryArticleByID = gql`
    query BlogArticle($id: ID!) {
        article_by_id(id: $id) {
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
            slug
            title
            tags
        }
    }
`;