import { useRouter } from 'next/router';

function getFontSize(length) {
  if (length > 32) {
    return `text-7xl`;
  }

  return `text-9xl`;
}

export async function getServerSideProps({query}) {
  return {
    props: {
      query
    }
  };
}

export default function Index({ query }) {
  const router = useRouter();

  // const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  // const link = searchParams.get('url');

  // if (!link) return null;

  // const linkURL = new URL(link);
  // const title = searchParams.get('title');
  // const date = searchParams.get('date');
  // const readTime = searchParams.get('readTime');

  return (
    <>
      <div
        className='relative flex flex-col justify-between p-16 text-neutral-100 bg-neutral-700'
        style={{ width: 1200, height: 630 }}
      >
        <div className='max-w-screen-lg space-y-2'>
          {query.date && query.readTime && <p className='text-3xl font-semibold text-neutral-600 font-source-sans-pro'>
            <span>{query.date}</span> — <span>{query.readTime}</span>
          </p>}
          <h1
            className={`${getFontSize(
              query.title.length
            )} font-bold text-neutral-100 font-source-sans-pro`}
          >
            {query.title}
          </h1>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-6'>
            <img
              src='https://pbs.twimg.com/profile_images/1220392920538386432/NuYyL5b5_400x400.jpg'
              alt='Florian Kapfenberger'
              className='flex-none w-32 h-32 border-4 border-neutral-200 rounded-full handsome'
            />
            <div className='flex flex-col gap'>
              <p className='mb-1 text-3xl font-semibold text-neutral-200 font-source-sans-pro'>
                Florian Kapfenberger
              </p>
              <p className='text-2xl font-semibold tracking-wide text-indigo-400 font-open-sans'>
                phiilu.com<span className='path'>{query.linkURL}</span>
              </p>
              <p
                className='text-2xl font-semibold tracking-wide font-source-sans-pro'
                style={{ color: '#1D9BF0' }}
              >
                twitter.com/phiilu
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Index.getLayout = function getLayout(page) {
  return page;
};