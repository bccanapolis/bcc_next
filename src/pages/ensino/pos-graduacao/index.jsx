import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import poke from 'pokeipsum';

export async function getServerSideProps() {
  const query = gql`
      {
          postgraduate_page {
              description
              id
          }
      }

  `;

  const { postgraduate_page } = (await client.query({ query })).data;


  return {
    props: {
      page: postgraduate_page
    }
  };
}

export default function index({ page }) {
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
      <Container className='space-y-4'>
        <div className='prose' dangerouslySetInnerHTML={{ __html: page.description }} />
        <div className='prose' dangerouslySetInnerHTML={{ __html: poke.paragraphs(3) }} />
      </Container>
    </>
  );
}