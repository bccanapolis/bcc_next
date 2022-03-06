import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';

export default function index({}) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'extensao', disabled: true }, {
    url: `/extensao/empresa-junior`,
    label: 'empresa junior',
    disabled: true
  }];

  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Code Tower</p>
      </BannerBreadcrumb>
      <Container>
        <p>Texto aqui!</p>
      </Container>
    </>
  );
}