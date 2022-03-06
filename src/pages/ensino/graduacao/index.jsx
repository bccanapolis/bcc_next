import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';

export async function getServerSideProps() {
  const query = gql`
      {
          graduation_page {
              id
              description
          }
      }

  `;

  const { graduation_page } = (await client.query({ query })).data;


  return {
    props: {
      page: graduation_page
    }
  };
}

export default function index({ page }) {
  const paths = [{ url: '/', label: 'home' }, { url: '', label: 'ensino', disabled: true }, {
    url: `/ensino/graduacao`,
    label: 'graduação',
    disabled: true
  }];

  return (
    <>
      <BannerBreadcrumb paths={paths}>
        <p className='text-5xl text-white text-center uppercase font-semibold'>Bacharelado em Ciência da Computação</p>
      </BannerBreadcrumb>
      <Container className='space-y-4'>
        <div className='prose' dangerouslySetInnerHTML={{ __html: page.description }} />
      </Container>
    </>
  );
}