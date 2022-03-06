import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { gql } from '@apollo/client';
import client from '@/apollo-client';

export async function getServerSideProps() {
  const query = gql`
      {
          junior_company_page {
              id
              description
          }
      }

  `;

  const { junior_company_page } = (await client.query({ query })).data;


  return {
    props: {
      page: junior_company_page
    }
  };
}

export default function index({ page }) {
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
      <Container className='space-y-4'>
        <div className='prose' dangerouslySetInnerHTML={{ __html: page.description }} />
      </Container>
    </>
  );
}