import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import poke from 'pokeipsum';

export async function getServerSideProps() {
  // const query = gql`
  // `;

  // const { graduation_page } = (await client.query({ query })).data;


  return {
    props: {}
  };
}

export default function index({ page }) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'ensino', disabled: true }, {
    url: ``,
    label: 'técnico integrado',
    disabled: true
  }];

  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Curso Técnico Integrado</p>
      </BannerBreadcrumb>
      <Container className='space-y-4'>
        <div className='prose' dangerouslySetInnerHTML={{ __html: poke.paragraphs(8) }} />
      </Container>
    </>
  );
}