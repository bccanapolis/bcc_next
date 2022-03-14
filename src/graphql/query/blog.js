import { gql } from '@apollo/client';

export const queryBlogTags = gql`
    query BlogPage($page: Int = 1, $limit: Int = 10, $tags:String="") {
        article(limit: $limit, page: $page, sort: "-date_created", filter: {status: {_eq: "published"}, tags: {_contains: $tags}}) {
            user_created
            id
            title
            description
            cover {
                id
            }
            tags
            slug
        }
        article_aggregated(filter: {status: {_eq: "published"}}) {
            count {
                id
            }
        }
    }
`;

export const queryBlog = gql`
    query BlogPage($page: Int = 1, $limit: Int = 10) {
        article(limit: $limit, page: $page, sort: "-date_created", filter: {status: {_eq: "published"}}) {
            user_created
            id
            title
            description
            cover {
                id
            }
            tags
            slug
        }
        article_aggregated(filter: {status: {_eq: "published"}}) {
            count {
                id
            }
        }
    }
`;

export const queryArticleByID = gql`
    query BlogArticle($id: ID!) {
        article_by_id(id: $id) {
            content
            cover {
                id
            }
            date_created
            date_updated
            description
            id
            slug
            title
        }
    }
`;