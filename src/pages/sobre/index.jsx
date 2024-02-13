import Container from '@/components/layout/Container';
import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import slugify from 'slugify';
import { classNames } from '@/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage({ page }) {
  const paths = [
    { url: '/', label: 'home' },
    {
      url: '/sobre',
      label: 'Sobre',
      disabled: false,
    },
  ];

  const items = [
    {
      title: 'Apresentação',
      description:
       [ 'AAberto em 2016, o Bacharelado em Ciência da Computação do IFG Campus Anápolis tem se tornado um espaço frutífero de oportunidades e muito aprendizado para os interessados em computação. Em nosso curso, o estudante terá a possibilidade de pleitear bolsas de estudo em pesquisas acadêmicas, projetos de extensão, assistência estudantil (alimentação, transporte e permanência), além de participar de projetos com empresas parceiras e com nossa Empresa Júnior, a Code Tower.',
        'Abaixo apresentamos um histórico dos índices de avaliação do nosso curso realizado pelo MEC.'],
      link: {
        label: 'Veja o link para inscrição e vestibulares',
        url: 'http://www.ifg.edu.br/estudenoifg',
      },
      // cover: '/img/bcc.png',
    },
    {
      title: 'Em 2019 - Conceito Nota 5 no Reconhecimento do Curso pelo INEP/MEC',
      description: [
        'O curso de Ciência da Computação do IFG obteve a nota 5, a menção máxima, em sua primeira avaliação durante o reconhecimento do curso. O reconhecimento é feito por avaliadores do Instituto Nacional de Estudos e Pesquisas Educacionais (INEP/MEC). A nota foi obtida após visita ao câmpus, no dia 09 e 10 de dezembro de 2019.'
      ],
      cover: '/img/sobre/mec.png',
      link: {
        url: 'https://www.ifgoias.edu.br/aluno/17-ifg/ultimas-noticias/16388-ciencia-da-computacao-nota-5',
        title: true
      }
    },
    {
      title: 'Em 2022 – O BCC entre os melhores do Estado',
      description: [
        'O curso de Ciência da Computação do IFG Anápolis recebeu o conceito 4 no Exame Nacional de Desempenho dos Estudantes (Enade), destacando-se entre os melhores cursos da área no Estado. Esse conceito  foi obtido na primeira participação dos alunos concluintes. Segundo o coordenador do curso na ocasião da prova, professor Sérgio Canuto, “esse conceito 4 no Enade confirma a qualidade do ensino que o IFG provê não só a Anápolis, mas a todo o Estado, uma vez que o curso vem, cada vez mais, atraindo alunos e alunas de diversos municípios goianos e de todo o País”. '
      ],
      cover: '/img/sobre/enade.png',
    },
    {
      title: 'Em 2023 – O curso de Ciência da Computação recebe nota 5 em avaliação final do MEC',
      description: [
        'O curso de Ciência da Computação do IFG Anápolis está entre os 13 melhores do Brasil da área de Ciência da Computação, conforme o índice CPC (Conceito Preliminar de Curso) divulgado pelo Ministério da Educação (MEC) em 2023 . O bacharelado ofertado pelo câmpus recebeu o conceito máximo do MEC, nota 5, e por isso ficou classificado como o melhor curso de Ciência da Computação do Centro-Oeste. O curso também é o único de Goiás a receber o conceito 5.',
        'O CPC é um indicador de qualidade utilizado no Sistema Nacional de Avaliação da Educação Superior (Sinaes) no Brasil. Ele é calculado pelo MEC e tem como objetivo avaliar a qualidade dos cursos de graduação das instituições de ensino superior do país. O CPC é mensurado a partir de diferentes componentes e indicadores, levando em consideração aspectos como desempenho dos estudantes, infraestrutura, corpo docente e outros fatores relevantes para a qualidade do curso.'
      ],
      cover: '/img/sobre/nota5.png',
      link: {
        title: true,
        url: 'https://www.dmanapolis.com.br/noticia/57486/ciencia-da-computacao-do-ifg-anapolis-esta-entre-os-13-melhores-do-brasil',
      }
    },
  ];

  const renderImg = (item, hidden, force) => {
    if (!item.cover) return null;

    return (
      <div
        className={classNames(
          force ? 'lg:hidden' : 'hidden ' + (hidden ? 'lg:hidden' : 'lg:block'),
          ' relative h-full min-h-[16rem]'
        )}
      >
        <Image
          src={item.cover}
          alt={item.cover.description}
          layout='fill'
          objectFit='contain'
        />
      </div>
    );
  }

  return (
    <>
      {/*<HeadSeo title={page.seo_title} description={page.seo_description} openGraph={page.seo_image}*/}
      {/*         keywords={page.seo_keywords} />*/}
      <BannerBreadcrumb paths={paths}>
        <p className="text-5xl text-neutral-100 text-center uppercase font-semibold">
          sobre
        </p>
      </BannerBreadcrumb>
      <Container className="space-y-16">
        {items.map((item, index) => (
          <div
            id={slugify(item.title.toLowerCase())}
            key={index}
            className="grid lg:grid-cols-3 gap-8 border-b pb-16"
          >
            {renderImg(item, index % 2 === 0)}
            <div className={item.cover ? 'col-span-2' : 'col-span-full'}>
              {
                item.link && item.link.title ? (
                    <Link
                      href={item.link.url}
                      rel='noreferrer'
                      className='hover:text-primary underline transition-colors duration-300'
                    >
                      <h4 className='text-xl font-semibold'>{item.title}</h4>
                    </Link>
                  ) :
                  <h4 className='text-xl font-semibold'>{item.title}</h4>

              }
              <div
                className="prose prose-neutral mt-4 mb-4"
              >
                {item.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
              {!!item.link && !item.link.title && (
                <p className='space-x-2'>
                  <span>{item.link.label}:</span>
                  <Link
                    href={item.link.url}
                    rel="noreferrer"
                    className="hover:text-primary underline transition-colors duration-300 "
                  >
                    {item.link.url}
                  </Link>
                </p>
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
