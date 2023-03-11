import { gql } from '@apollo/client';
import client from '@/apollo-client';
import Container from '@/components/layout/Container';
import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import slugify from 'slugify';
import { apiAsset, classNames } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';
import Link from 'next/link';
import Image from 'next/image';
import GameBannerYears from '@/components/home/GameBannerYears';
import { ExternalLinkIcon } from '@heroicons/react/outline';

export async function getStaticProps({}) {
  const query = gql`
    {
      projetos_page {
        hero_title
        seo_title
        seo_keywords
        seo_description
        content
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
      game: project(filter: { tags: { _contains: "game" } }) {
        title
        link {
          label
          url
        }
        professors {
          professor_id {
            id
            user {
              first_name
              last_name
              lattes
            }
            degree
          }
        }
        description
        id
        cover {
          description
          id
          width
          height
        }
      }
      game_aggregated(groupBy: "year", sort: "-year") {
        group
      }
      project(sort: "title", filter: { status: { _eq: "published" } }) {
        title
        link {
          label
          url
        }
        professors {
          professor_id {
            id
            user {
              first_name
              last_name
              lattes
            }
            degree
          }
        }
        description
        id
        cover {
          description
          id
          width
          height
        }
      }
    }
  `;

  const { project, projetos_page, game, game_aggregated } = (
    await client.query({ query })
  ).data;

  const projects = project.map((item) => ({
    ...item,
    professors: item.professors.map((prof) => ({
      ...prof.professor_id,
    })),
  }));

  const years = game_aggregated.map((item) => item.group.year);

  const gameProject = game.map((item) => ({
    ...item,
    professors: item.professors.map((prof) => ({
      ...prof.professor_id,
    })),
  }));

  const carousel = projetos_page.hero_carousel
    ? projetos_page.hero_carousel.map((item) => ({
        url: apiAsset(item.directus_files_id.id),
        alt: item.directus_files_id.description,
      }))
    : [];

  return {
    props: {
      projects,
      page: {
        ...projetos_page,
        carousel,
      },
      game: gameProject,
      years,
    },
    revalidate: 60 * 60,
  };
}

export default function ProjectsPage({ projects, page, game, years }) {
  const paths = [
    { url: '/', label: 'home' },
    {
      url: '/extensao',
      label: 'Extensão',
      disabled: true,
    },
    { url: '/ensino/projetos', label: 'Projetos', disabled: true },
  ];

  const renderImg = (item, hidden, force) => (
    <div
      className={classNames(
        force ? 'lg:hidden' : 'hidden ' + (hidden ? 'lg:hidden' : 'lg:block'),
        ' relative h-full min-h-[24rem]'
      )}
    >
      <Image
        src={apiAsset(item.cover.id)}
        alt={item.cover.description}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );

  return (
    <>
      <HeadSeo
        title={page.seo_title}
        description={page.seo_description}
        openGraph={page.seo_image}
        keywords={page.seo_keywords}
      />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p className="text-5xl text-neutral-100 text-center uppercase font-semibold">
          {page.hero_title || 'Hero Title'}
        </p>
      </BannerBreadcrumb>
      {!!page.content && (
        <Container>
          <div
            className="prose prose-neutral"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </Container>
      )}
      <Container className="space-y-16">
        {game.map((item, index) => (
          <div
            id={slugify(item.title.toLowerCase())}
            key={index}
            className="grid lg:grid-cols-2 gap-8 border-b"
          >
            {renderImg(item, false)}
            <div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <div
                className="prose prose-neutral mt-2 mb-4"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              {!!item.link && (
                <span>
                  Link:{' '}
                  <Link
                    href={item.link.url}
                    rel="noreferrer"
                    className="hover:text-primary hover:underline transition-colors duration-300"
                  >
                    {item.link.url}
                  </Link>
                </span>
              )}
            </div>

            {renderImg(item, false, true)}
          </div>
        ))}
      </Container>
      <GameBannerYears className="container py-0" games={years} />
      <Container className="space-y-16">
        {projects.map((item, index) => (
          <div
            id={slugify(item.title.toLowerCase())}
            key={index}
            className="grid lg:grid-cols-2 gap-8 border-b pb-16"
          >
            {renderImg(item, index % 2 === 0)}
            <div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <div
                className="prose prose-neutral mt-2 mb-4"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              {!!item.link && (
                <span>
                  <a
                    href={item.link.url}
                    rel="noreferrer"
                    className="hover:text-white hover:bg-primary  transition-colors duration-300 border-primary border-2 px-2 py-1 align-middle"
                  >
                    <ExternalLinkIcon className="w-5 inline-block mr-2" />
                    {item.link.label}
                  </a>
                </span>
              )}
            </div>
            {renderImg(item, index % 2 !== 0)}
            {renderImg(item, false, true)}
          </div>
        ))}
      </Container>
      {/*<GameBannerYears />*/}
    </>
  );
}
