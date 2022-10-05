import { gql } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export const dynamicBlog = (page, limit, tags = '', author = '', search = '', info = false) => {
  const query = {
    query: {
      recent_article: {
        __aliasFor: 'article',
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
        slug: true,
        date_created: true
      },

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
        tags: {
          blog_tag_id: {
            name: true
          }
        },
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
      blog_tag: {
        name: true
      }
    }
  };

  if (!!tags) {
    query.query.article.__args.filter.tags = {
      blog_tag_id: { name: { _eq: tags } }
    };
    query.query.article_aggregated.__args.filter.tags = {
      blog_tag_id: { name: { _eq: tags } }
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

  if (info) {
    query.query.blog_page = {
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

export const queryArticleByID = gql`
    query BlogArticle($id: ID!) {
        recent_article: article(
            limit: 5
            page: 1
            sort: "-date_created"
            filter: {status: {_eq: "published"}}
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
        article_tags {
            name
        }
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
            title
            tags {
                article_tags_id {
                    name
                }
            }
        }
    }

`;