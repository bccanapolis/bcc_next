import Link from 'next/link'

export default function breadcrumb({ paths }) {
  return (
    <>
      <nav
        aria-label='breadcrumb'
        className='flex py-3 px-5 text-gray-700'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          {
            paths.map((link, index) => (
              <li key={link.label} aria-current={(index === paths.length - 1) && 'page'}
                  className='inline-flex items-center'>
                <Link href={link.url}>
                  <a className='inline-flex items-center text-sm font-medium text-white hover:text-primary uppercase'>
                    {
                      (index != 0) &&
                      <svg className='w-6 h-6 mr-2 text-gray-400' fill='currentColor'
                           viewBox='0 0 20 20'
                           xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                              fillRule='evenodd' />
                      </svg>
                    }
                    {link.label}
                  </a>
                </Link>
              </li>
            ))
          }
        </ol>
      </nav>
    </>
  )
}