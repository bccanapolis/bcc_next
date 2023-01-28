import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import { apiAsset } from '@/utils';
import HeadSeo from '@/components/layout/HeadSeo';
import WhoWeAre from '@/components/empresa-junior/WhoWeAre';
import Service from '@/components/empresa-junior/Service';
import BannerCode from '@/components/empresa-junior/BannerCode';
import Premiacoes from '@/components/empresa-junior/Premiacoes';

export async function getServerSideProps() {
  const query = gql`
    {
      empresa_junior_page {
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
          }
        }
      }
    }
  `;

  const { empresa_junior_page } = (await client.query({ query })).data;

  const carousel = empresa_junior_page.hero_carousel
    ? empresa_junior_page.hero_carousel.map((item) => ({
        url: apiAsset(item.directus_files_id.id),
        alt: item.directus_files_id.description,
      }))
    : null;

  return {
    props: { page: { ...empresa_junior_page, carousel } },
  };
}

export default function index({ page }) {
  const paths = [
    { url: '/', label: 'home' },
    { url: '', label: 'extensao', disabled: true },
    {
      url: `/extensao/empresa-junior`,
      label: 'empresa junior',
      disabled: true,
    },
  ];

  const premiacoes = [
    {
      title: 'Prêmio Ipê 2021',
      description:
        'Ganhando dois prêmios a Code Tower marcou presença no evento com: Júnior só no nome; Floresceu.',
      photo: '/img/codetower/2.jpg',
    },
    {
      title: 'ENEJ 2022',
      description:
        'Construção de aplicativos otimizados para serem usados pelos diferentes modelos de celular que seu público-alvo possa ter.',
      photo: '/img/codetower/1.jpg',
    },
    {
      title: 'Prêmio Ipê 2022',
      description:
        'Ganhando três prêmios a Code Tower marcou presença pela segunda vez no evento com: EJ com a maior evolução no Alto Crescimento; EJs qeu atingiram o Alto Crescimento, Colaboração e Inovadora; Junior só no nome.',
      photo: '/img/codetower/4.jpeg',
    },
  ];

  const services = [
    {
      title: 'Websites',
      description:
        'Manutenção e construção de novos sites e sistemas otimizados para o crescimento do seu negócio.',
    },
    {
      title: 'Aplicativos',
      description:
        'Construção de aplicativos otimizados para serem usados pelos diferentes modelos de celular que seu público-alvo possa ter.',
    },
    {
      title: 'Sistema Web',
      description:
        'Desenvolvimento de aplicações sobre demandas, tanto para cadastro de usuários até para gestão de estoque do seu empreendimento.',
    },
  ];

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
      <Container className="space-y-4">
        <div
          className="prose prose-neutral"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </Container>

      <WhoWeAre />
      <Service services={services} />
      <Premiacoes premiacoes={premiacoes} />
      <BannerCode className="mt-28" />
    </>
  );
}
