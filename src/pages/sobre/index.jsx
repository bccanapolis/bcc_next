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
       [ 'Aberto em 2016, o Bacharelado em Ciência da Computação do IFG Campus Anápolis tem se tornado um espaço de oportunidades e muito aprendizado para quem gosta de computação. Com possibilidade de pleitear bolsas de estudo em pesquisas acadêmicas, projetos de extensão, assistência estudantil (alimentação, transporte e permanência), além de participar de projetos com empresas parcerias e com nossa Empresa Júnior, Code Tower.',
        'Para os interessados, veja o link para inscrição e vestibulares.',],
      link: {
        label: 'Inscrição e Vestibulares',
        url: 'http://www.ifg.edu.br/estudenoifg',
      },
      cover: '/img/bcc.png',
    },
    {
      title: 'Ciência da Computação recebe nota 5 em avaliação final do MEC',
      description:
       [ 'O curso de Ciência da Computação do IFG Anápolis está entre os 13 melhores do Brasil da área de Computação, conforme índices divulgados pelo Ministério da Educação (MEC) em 2023 no CPC (Conceito Preliminar de Curso). O bacharelado ofertado pelo câmpus recebeu o conceito máximo do MEC, nota 5, e por isso ficou classificado como o melhor curso de Computação do Centro-Oeste. O curso também é o único de Goiás a receber o conceito 5.','O CPC é um indicador de qualidade definitivo utilizado no Sistema Nacional de Avaliação da Educação Superior (Sinaes) no Brasil. Ele é calculado pelo MEC e tem como objetivo avaliar a qualidade dos cursos de graduação das instituições de ensino superior do país. O CPC é mensurado a partir de diferentes componentes e indicadores, levando em consideração aspectos como desempenho dos estudantes, infraestrutura, corpo docente e outros fatores relevantes para a qualidade do curso.'],
      cover: '/img/nota5.png',
    },
    {
      title: 'BCC entre os melhores do Estado.',
      description:
        ['O curso de Ciência da Computação do IFG Anápolis recebeu o conceito 4 no Exame Nacional de Desempenho dos Estudantes (Enade), destacando-se entre os melhores cursos da área no Estado de Goiás. Esse conceito já foi obtido na primeira participação dos seus alunos concluintes. Segundo o coordenador do curso na ocasião da prova, professor Sérgio Canuto, “esse conceito 4 no Enade confirma a qualidade do ensino que o IFG provê não só a Anápolis, mas a todo o Estado, uma vez que o curso vem, cada vez mais, atraindo alunos e alunas de diversos municípios goianos e de todo o País”.'],
      cover: '/img/enade.png',
    },
  ];

  const renderImg = (item, hidden, force) => (
    <div
      className={classNames(
        force ? 'lg:hidden' : 'hidden ' + (hidden ? 'lg:hidden' : 'lg:block'),
        ' relative h-full min-h-[16rem]'
      )}
    >
      <Image
        src={item.cover}
        alt={item.cover.description}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );

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
            <div className="col-span-2">
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <div
                className="prose prose-neutral mt-4 mb-4"
              >
                {item.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
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
            {renderImg(item, index % 2 !== 0)}
            {renderImg(item, false, true)}
          </div>
        ))}
      </Container>
      {/*<GameBannerYears />*/}
    </>
  );
}
