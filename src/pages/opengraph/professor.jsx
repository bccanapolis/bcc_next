import Image from 'next/image';
import { apiAsset } from '@/utils';
import LattesSVG from '@/components/atoms/LattesSVG';
import { AtSymbolIcon } from '@heroicons/react/solid';

function getFontSize(length) {
  if (length > 32) {
    return `text-6xl`;
  }

  return `text-7xl`;
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      query
    }
  };
}

export default function Index({ query }) {
  return (
    <>
      <div
        className='text-neutral-900 bg-white font-poppins shadow-md flex flex-col'
        style={{ width: 1200, height: 630 }}
      >
        <div className='bg-neutral-700 h-32 px-16 py-4 flex justify-between'>
          <div className='relative h-full w-80'>
            <Image
              src='/img/bcc_anapolis_logo.svg'
              layout='fill'
            />
          </div>
          <div className='relative h-full w-80'>
            <Image
              className='h-8 w-auto'
              src='/img/ifg_logo.svg'
              layout='fill'
            />
          </div>

        </div>
        <div className='flex h-full flex-col items-center justify-between p-16'>
          <div
            className='flex flex w-full gap-16'>
            <div className='relative overflow-hidden rounded-lg w-64 h-64'>
              <Image
                src={query.avatar ? apiAsset(query.avatar) : '/img/open_graph_squared.png'}
                className='object-cover'
                layout='fill' />
            </div>
            <p
              className='text-7xl font-semibold uppercase flex-1 inline-flex'>{query.name}</p>
          </div>
          <ul
            className='text-3xl flex items-center justify-center gap-x-16'>
            <li>
              <p
                className='flex items-center gap-2 text-neutral-500'>
                <LattesSVG className='w-10 h-10 inline-block' />{' '}
                {query.lattes}
              </p>
            </li>
            <li>
              <p
                className='flex items-center gap-2 text-neutral-500'>
                <AtSymbolIcon className='w-10 h-10 inline-block' />{' '}
                {query.email}
              </p>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}

Index.getLayout = function getLayout(page) {
  return page;
};