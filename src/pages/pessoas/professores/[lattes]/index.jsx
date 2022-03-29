import { apiAsset, querySerialize, sortByField, urlSlugID } from '@/utils';
import { gql } from '@apollo/client';
import { fullName, urlLattes } from '@/utils/user';
import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import apolloClient from '@/apollo-client';
import slugify from 'slugify';
import ProfessorProducaoTimeline from '@/components/professores/ProfessorProducaoTimeline';
import { AcademicCapIcon, AtSymbolIcon, BookOpenIcon, ClipboardCopyIcon } from '@heroicons/react/solid';
import LattesSVG from '@/components/atoms/LattesSVG';
import Container from '@/components/layout/Container';
import HeadSeo from '@/components/layout/HeadSeo';
import Image from 'next/image';
import { fetchProfessor } from '@/lib/lattes';
import { defaultToast } from '@/hooks/toast';
import getOgImage from '@/lib/getOgImage';

export default function IndexPage({ professor, page }) {
  const producao_keywords = {
    resumo: 'Resumo Currículo',
    formacao: 'Formação Acadêmica',
    artigos: 'Artigos Periódicos',
    resumo_trabalhos: 'Artigos de Conferência',
    capitulo_livro: 'Capítulo de livro',
    trabalho_evento: 'Trabalhos em Eventos',
    producacao_tecnica: 'Producões Técnicas',
    orientacao: 'Orientações',
    projeto_pesquisa: 'Projetos de Pesquisa',
    software: 'Softwares',
    banca: 'Bancas'
  };

  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'pessoas', disabled: true }, {
    url: `/pessoas/professores`,
    label: 'Professores',
    disabled: false
  }];

  professor.links = [
    {
      url: urlLattes(professor.user.lattes),
      icon: <LattesSVG className='w-4 h-4 inline-block' />,
      label: urlLattes(professor.user.lattes).replace(/(http:\/\/)|(https:\/\/)/, ''),
      external: true
    },
    {
      url: professor.user.email,
      icon: <AtSymbolIcon className='w-4 h-4 inline-block' />,
      label: professor.user.email,
      copy: true
    }
  ];

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    defaultToast('Email copiado!', <ClipboardCopyIcon />);
  }

  return (
    <>
      <HeadSeo title={`${professor.degree} ${fullName(professor.user)}`} description={''} openGraph={page.seo_image} />
      <BannerBreadcrumb paths={paths}>
        <p
          className='text-5xl text-neutral-100 text-center uppercase font-semibold'>{professor.degree}{' '}{fullName(professor.user) || 'Hero Title'}</p>
      </BannerBreadcrumb>
      <Container className='flex w-full flex-wrap lg:flex-nowrap gap-8'>
        <div
          className='lg:sticky flex flex-col sm:flex-row lg:flex-col justify-center lg:justify-center items-center sm:items-start lg:items-center w-full sm:w-max lg:w-96 h-full top-16 gap-4 '>
          <div className='relative overflow-hidden rounded-full w-48 h-48 mx-auto'>
            <Image
              src={professor.user.avatar ? apiAsset(professor.user.avatar.id) : '/img/open_graph_squared.png'}
              className='object-cover lg:rounded-full group-hover:scale-[105%] transition-transform duration-300'
              layout='fill' />
          </div>
          <div
            className='flex flex-col justify-between items-center sm:items-start lg:items-center h-full gap-2 sm:py-4 lg-p-0'>
            <p
              className='lg:text-center sm:text-lg font-medium group-hover:text-primary transition-colors duration-300'>{fullName(professor.user)}</p>
            <ul
              className='space-y-2 flex flex-col items-center sm:items-start'>
              {
                professor.links.map((item) =>
                  <li key={`professor-links-${item.url}`}>
                    {
                      item.external &&
                      <a
                        className='flex items-center text-sm font-light hover:text-primary transition-colors duration-300 gap-2 text-neutral-500 '
                        href={item.url} target='_blank' rel='noreferrer'>
                        {item.icon}{' '}{item.label}
                      </a>
                    }
                    {
                      item.copy &&
                      <p
                        className='flex items-center text-sm font-light hover:text-primary transition-colors duration-300 gap-2 text-neutral-500 hover:cursor-pointer'
                        onClick={() => copyToClipboard(item.url)}>
                        {item.icon}{' '}{item.label}
                      </p>
                    }
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className='space-y-8 w-full'>
          {
            Object.keys(producao_keywords).map((key, index) =>
              <ProfessorProducaoTimeline
                key={`professor-producao-${key}`}
                defaultOpen={index === 0}
                id={key}
                title={producao_keywords[key]}
                producao={professor[key]}
              />
            )
          }
        </div>
      </Container>
      <Container>
        <p className='text-center text-sm text-neutral-500'>Dados colhidos da platorma{' '}
          <a className='underline hover:text-primary transition-colors duration-300'
             href='https://ifgproduz.ifg.edu.br/' target='_blank' rel='noreferrer'>IFG Produz</a>
        </p>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {

  const [slug, , lattes] = urlSlugID(context.params.lattes);

  const query = gql`
      query ProfessorByLattes($lattes:String!){
          professors(filter:{user:{lattes:{_eq:$lattes}}}) {
              id
              institution
              degree
              user {
                  email
                  first_name
                  last_name
                  lattes
                  avatar {
                      height
                      id
                      width
                  }
              }
          }
      }
  `;

  const variables = {
    lattes
  };

  const { professors } = (await apolloClient.query({ query, variables })).data;

  let professor = professors[0];

  const {
    path,
    height,
    width
  } = await getOgImage(
    `/opengraph/professor?${querySerialize({
      name: fullName(professor.user),
      lattes: professor.user.lattes,
      email: professor.user.email,
      avatar: professor.user.avatar ? professor.user.avatar.id : null
    })}`
  );

  const ifgproduz = await fetchProfessor(professor.user.lattes);

  const producao_keywords = {
    formacao: 'Formação Acadêmica',
    artigos: 'Artigo',
    banca: 'Banca',
    capitulo_livro: 'Capítulo de livro',
    orientacao: 'Orientação',
    producacao_tecnica: 'Producao Técnica',
    projeto_pesquisa: 'Projeto de Pesquisa',
    resumo_trabalhos: 'Resumo de Trabalhos',
    software: 'Software',
    trabalho_evento: 'Trabalho em Evento'
  };

  for (let item of ifgproduz['Sobre']) {
    if (Object.values(producao_keywords).includes(item['natureza_da_producao'])) {
      let key = Object.keys(producao_keywords).find(key => producao_keywords[key] === item['natureza_da_producao']);
      if (!(key in professor)) {
        professor = {
          ...professor,
          [key]: []
        };
      }
      professor[key].push(item);
    }
  }

  for (let item of Object.keys(producao_keywords)) {
    if (item === 'formacao')
      continue;
    if (item === 'banca' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano', true);
    if (item === 'artigos' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano_producao', true);
    if (item === 'capitulo_livro' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano_producao', true);
    if (item === 'orientacao' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano_orientacao', true);
    if (item === 'producacao_tecnica' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano_producao_tecnica', true);
    if (item === 'projeto_pesquisa' && !!professor[item])
      professor[item] = sortByField(professor[item], 'data_inicio', true);
    if (item === 'resumo_trabalhos' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano_producao', true);
    if (item === 'software' && !!professor[item])
      professor[item] = sortByField(professor[item], 'data_registro', true);
    if (item === 'trabalho_evento' && !!professor[item])
      professor[item] = sortByField(professor[item], 'ano_producao', true);
  }

  professor['resumo'] = ifgproduz['resumo_curriculo'];

  // fs.writeFileSync(`./${slugify(professor.user.first_name.toLowerCase())}.json`, JSON.stringify(ifgproduz));


  return {
    props: {
      professor,
      page: {
        seo_image: {
          url: path,
          width, height
        }
      }
    },
    revalidate: 60 * 60 * 24
  };
}

export async function getStaticPaths() {
  const query = gql`
      {
          professors(filter: {institution: {_eq: "IFG"}, status: {_eq: "published"}}) {
              id
              institution
              degree
              user {
                  email
                  first_name
                  last_name
                  lattes
                  avatar {
                      height
                      id
                      width
                  }
              }
          }
      }
  `;

  const { professors } = (await apolloClient.query({ query })).data;

  // Get the paths we want to pre-render based on posts
  const paths = professors.map(item => ({
    params: { lattes: `${slugify(fullName(item.user).toLowerCase())}@${item.user.lattes}` }
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: 'blocking' };
}