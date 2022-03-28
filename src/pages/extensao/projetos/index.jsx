import { gql } from '@apollo/client';
import client from '@/apollo-client';
import Container from '@/components/layout/Container';
import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import slugify from 'slugify';
import { apiAsset } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';

export async function getServerSideProps({}) {
  const query = gql`
      {
          projetos_page {
              hero_title
              seo_title
              seo_keywords
              seo_description
              seo_image {
                  id
                  width
                  height
              }
              hero_carousel {
                  directus_files_id {
                      id
                      description
                      tags
                  }
              }
          }
          project(sort: "title") {
              title
              url {
                  label
                  url
              }
              slug
              professors {
                  professors_id {
                      id
                      user {
                          first_name
                          last_name
                          lattes
                      }
                      degree
                  }
              }
              students {
                  student_id {
                      id
                      name
                  }
              }

              description
              id
          }
      }
  `;

  const { project, projetos_page } = (await client.query({ query })).data;

  const projects = project.map(item => ({
    ...item, professors: item.professors.map(prof => ({
      ...prof.professors_id
    })), students: item.students.map(prof => ({
      ...prof.student_id
    }))
  }));

  const carousel = projetos_page.hero_carousel ? projetos_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description
  })) : []

  return {
    props: {
      projects,
      page: {
        ...projetos_page,
        carousel
      }
    }
  };
}

export default function ProjectsPage({ projects, page }) {
  const paths = [{ url: '/', label: 'home' }, {
    url: '/extensao',
    label: 'Extensão',
    disabled: true
  }, { url: '/ensino/projetos', label: 'Projetos', disabled: true }];

  return (<>
      <HeadSeo title={page.seo_title} description={page.seo_description} openGraph={page.seo_image}
               keywords={page.seo_keywords} />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p className='text-5xl text-neutral-100 text-center uppercase font-semibold'>{page.hero_title || 'Hero Title'}</p>
      </BannerBreadcrumb>
      {
        !!page.content &&
        <Container>
          <div className='prose prose-neutral' dangerouslySetInnerHTML={{ __html: page.content }} />
        </Container>
      }
      <Container className='space-y-4'>
        {projects.map((item, index) => (
          <div id={slugify(item.slug.toLowerCase())} key={index}>
            <h4 className='text-xl font-semibold'>{item.title}</h4>
            <div className='prose prose-neutral mt-2 mb-4' dangerouslySetInnerHTML={{ __html: item.description }} />
            {
              !!item.url &&
              <span>
              Link: <a href={item.url.url} rel='noreferrer'
                       className='hover:text-primary hover:underline transition-colors duration-300'>{item.url.url}</a>
            </span>

            }
          </div>))}
      </Container>
    </>
  );
}