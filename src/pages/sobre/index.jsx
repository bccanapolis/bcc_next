import Container from '@/components/layout/Container';
import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import slugify from 'slugify';
import { classNames } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';
import Link from 'next/link';
import Image from 'next/image';


export default function ProjectsPage({ page }) {
  const paths = [{ url: '/', label: 'home' }, {
    url: '/sobre',
    label: 'Sobre',
    disabled: false
  }];


  const items = [{
    title: 'Apresentação',
    description: 'Aberto em 2016, o Bacharelado em Ciência da Computação do IFG Campus Anápolis tem se tornado um espaço de oportunidades e muito aprendizado para quem gosta de computação. Com possibilidade de pleitear bolsas de estudo em pesquisas acadêmicas, projetos de extensão, assistência estudantil (alimentação, transporte e permanência), além de participar de projetos com empresas parcerias e com nossa Empresa Júnior, Code Tower.' +
      'Para os interessados, veja o link para inscrição e vestibulares.',
    link: {
      label: 'Inscrição e Vestibulares',
      url: 'http://www.ifg.edu.br/estudenoifg'
    },
    cover: '/img/bcc.png'
  },
    {
      title: 'Conceito nota 5 do Inep/MEC',
      description: 'O curso de Ciência da Computação do IFG obteve a nota máxima em sua primeira avaliação para reconhecimento do curso, feita por técnicos do Instituto Nacional de Estudos e Pesquisas Educacionais (Inep/MEC). A nota 5 foi obtida após visita ao câmpus, nos dia 9 e 10 de dezembro de 2019. O curso obteve nota máxima em infra-estrutura e corpo docente!',
      cover: '/img/nota5.png'
    }, {
      title: 'BCC entre os melhores do Estado.',
      description: 'O curso de Ciência da Computação do IFG Anápolis recebeu o conceito 4 no Exame Nacional de Desempenho dos Estudantes (Enade), destacando-se entre os melhores cursos da área no Estado de Goiás. Esse conceito já foi obtido na primeira participação dos seus alunos concluintes. Segundo o coordenador do curso na ocasião da prova, professor Sérgio Canuto, “esse conceito 4 no Enade confirma a qualidade do ensino que o IFG provê não só a Anápolis, mas a todo o Estado, uma vez que o curso vem, cada vez mais, atraindo alunos e alunas de diversos municípios goianos e de todo o País”.',
      cover: '/img/enade.png'
    }];

  const renderImg = (item, hidden, force) => (<div
    className={classNames(force ? 'lg:hidden' : 'hidden ' + (hidden ? 'lg:hidden' : 'lg:block'), ' relative h-full min-h-[16rem]')}>
    <Image src={item.cover} alt={item.cover.description}
           layout='fill' objectFit='contain' />
  </div>);

  return (<>
      {/*<HeadSeo title={page.seo_title} description={page.seo_description} openGraph={page.seo_image}*/}
      {/*         keywords={page.seo_keywords} />*/}
      <BannerBreadcrumb paths={paths}>
        <p
          className='text-5xl text-neutral-100 text-center uppercase font-semibold'>sobre</p>
      </BannerBreadcrumb>
      <Container className='space-y-16'>
        {items.map((item, index) => (
          <div id={slugify(item.title.toLowerCase())} key={index}
               className='grid lg:grid-cols-3 gap-8 border-b pb-16'>
            {
              renderImg(item, index % 2 === 0)
            }
            <div className='col-span-2'>
              <h4 className='text-xl font-semibold'>{item.title}</h4>
              <div className='prose prose-neutral mt-2 mb-4' dangerouslySetInnerHTML={{ __html: item.description }} />
              {
                !!item.link &&
                <span>
              Link: <Link href={item.link.url} rel='noreferrer'
                          className='hover:text-primary hover:underline transition-colors duration-300'>{item.link.url}</Link>
            </span>
              }
            </div>
            {
              renderImg(item, index % 2 !== 0)
            }
            {
              renderImg(item, false, true)
            }

          </div>))}
      </Container>
      {/*<GameBannerYears />*/}
    </>
  );
}