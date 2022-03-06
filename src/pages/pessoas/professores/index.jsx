import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';

export default function index({}) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'pessoas', disabled: true }, {
    url: ``,
    label: 'Professores',
    disabled: true
  }];

  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Professores</p>
      </BannerBreadcrumb>
      <Container>
        <p>Texto aqui!</p>
      </Container>
    </>
  );
}