import { gql } from '@apollo/client';
import client from '@/apollo-client';
import Container from '@/components/layout/Container';
import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import slugify from 'slugify';
import Link from 'next/link';

export async function getServerSideProps() {
  const query = gql`
      {
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
                      lattes
                      name
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

  const { project } = (await client.query({ query })).data;

  const projects = project.map(item => ({
    ...item, professors: item.professors.map(prof => ({
      ...prof.professors_id
    })), students: item.students.map(prof => ({
      ...prof.student_id
    }))
  }));

  return {
    props: {
      projects
    }
  };
}

export default function ProjectsPage({ projects }) {
  const paths = [{ url: '/', label: 'home' }, {
    url: '/extensao',
    label: 'Extensão',
    disabled: true
  }, { url: '/ensino/projetos', label: 'Projetos', disabled: true }];

  const gamesPath = [
    { url: '/games/2021', label: 'Jogos de 2021' },
    { url: '/games/2019', label: 'Jogos de 2019' },
    { url: '/games/2018', label: 'Jogos de 2018' }
  ];

  return (<>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Projetos</p>
      </BannerBreadcrumb>
      <Container className='space-y-4'>
        <div>
          <h4 className='text-xl font-semibold'>Games</h4>
          <div className='prose'>
            <ul>
              {
                gamesPath.map(item => (
                  <li key={item.url}>
                    <Link href={item.url}>
                      <a>{item.label}</a>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        {projects.map((item, index) => (
          <div id={slugify(item.slug.toLowerCase())} key={index}>
            <h4 className='text-xl font-semibold'>{item.title}</h4>
            <div className='prose mt-2 mb-4' dangerouslySetInnerHTML={{ __html: item.description }} />
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