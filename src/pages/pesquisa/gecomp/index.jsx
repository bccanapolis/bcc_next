import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import HeadSeo from '@/components/layout/HeadSeo';
import { apiAsset, classNames } from '@/utils';
import { fullName, sortByFullName, urlLattes } from '@/utils/user';
import { useState } from 'react';

export default function index({ page }) {
  const paths = [
    { url: '/', label: 'home' },
    { url: '', label: 'pesquisa', disabled: true },
    {
      url: '',
      label: 'gecomp',
      disabled: true,
    },
  ];

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <HeadSeo
        title={page.seo_title}
        description={page.seo_description}
        keywords={page.seo_keywords}
        openGraph={page.seo_image}
      />
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p className="text-5xl text-neutral-100 text-center uppercase font-semibold">
          {page.hero_title || 'Hero Title'}
        </p>
      </BannerBreadcrumb>
      <Container>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-8/12 ">
            <iframe
              width="100%"
              height="420"
              src="https://www.youtube.com/embed/pbObyQ4Ql_I"
              title="YouTube video player"
              frameBorder="0"
              className="mb-8"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            <div
              className={classNames(
                'prose prose-neutral',
                !open1 && 'truncate-6'
              )}
              dangerouslySetInnerHTML={{ __html: page.section1 }}
            ></div>
            <button
              onClick={() => setOpen1(!open1)}
              className="mx-auto block my-6 text-primary"
            >
              {open1 ? 'Leia menos' : 'Leia mais'}
            </button>
            <div
              className={classNames(
                'prose prose-neutral',
                !open2 && 'truncate-6'
              )}
              dangerouslySetInnerHTML={{ __html: page.section2 }}
            />
            <button
              onClick={() => setOpen2(!open2)}
              className="mx-auto block my-6 text-primary"
            >
              {open2 ? 'Leia menos' : 'Leia mais'}
            </button>
            <div
              className="prose prose-neutral"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
          <div className="w-full md:w-4/12 flex flex-col gap-4">
            {!!page.members && (
              <div className="bg-neutral-50 px-2 w-full">
                <p className="text-lg font-semibold mx-4">
                  Professores Integrantes
                </p>
                <ul className="w-full text-sm font-medium text-neutral-900 rounded-lg list-none">
                  {page.members.map((member, index) => (
                    <li
                      key={member.user.lattes}
                      className={`py-2 px-4 w-full underline hover:text-primary transition-color duration-300 ${
                        index !== page.members.length - 1
                          ? 'border-b border-text-neutral-300'
                          : ''
                      }`}
                    >
                      <a
                        href={urlLattes(member.user.lattes)}
                        className="capitalize"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {member?.degree} {fullName(member.user)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!page.areas && (
              <div className="bg-neutral-50 px-2 w-full">
                <p className="text-lg font-semibold mx-4">Linhas de Pesquisa</p>
                <ul className="w-full text-sm font-medium text-neutral-900 rounded-lg list-none">
                  {page.areas.sort().map((area, index) => (
                    <li
                      key={index}
                      className={`py-2 px-4 w-full ${
                        index !== page.areas.length - 1
                          ? 'border-b border-text-neutral-300'
                          : ''
                      }`}
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps({}) {
  const query = gql`
    {
      gecomp_page {
        areas
        content
        members(filter: { professor_id: { gecomp: { _eq: true } } }) {
          professor_id {
            user {
              first_name
              last_name
              lattes
            }
            institution
            degree
          }
        }
        hero_carousel {
          directus_files_id {
            id
            description
          }
        }
        hero_title
        seo_title
        section1
        section2
        seo_keywords
        seo_description
        seo_image {
          id
          width
          height
        }
      }
    }
  `;

  const { gecomp_page } = (
    await client.query({
      query: query,
    })
  ).data;

  const areas = gecomp_page.areas;
  const description = gecomp_page.content;
  const members = gecomp_page.members.map((item) => ({
    ...item.professor_id,
  }));

  const carousel = gecomp_page.hero_carousel
    ? gecomp_page.hero_carousel.map((item) => ({
        url: apiAsset(item.directus_files_id.id),
        alt: item.directus_files_id.description,
      }))
    : [];

  return {
    props: {
      page: {
        ...gecomp_page,
        areas,
        description,
        members: sortByFullName(members),
        carousel,
      },
    },
    revalidate: 60 * 60,
  };
}
