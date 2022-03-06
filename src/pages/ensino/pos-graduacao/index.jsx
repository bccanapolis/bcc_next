import BannerBreadcrumb from '@/components/BannerBreadcrumb';

export default function index({}) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'ensino', disabled: true }, {
    url: `/ensino/pos-graduacao`,
    label: 'pós graduação',
    disabled: true
  }];

  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Inteligência Artificial Aplicada</p>
      </BannerBreadcrumb>
    </>
  );
}