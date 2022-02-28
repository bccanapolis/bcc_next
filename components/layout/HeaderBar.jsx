import Link from 'next/link';
import Image from 'next/image'

export default function HeaderBar({}) {
  const navigation = [
    {
      url: '/',
      label: 'Home'
    },
    {
      url: '/gecomp',
      label: 'gecomp'
    },
    {
      url: '/games',
      label: 'games'
    }
  ];

  return (
    <>
      <header className='fixed top-0 w-full'>
        <nav className='px-2 bg-neutral/90 py-3 border-gray-200 '>
          <div className='container flex flex-wrap justify-between items-center'>
            <div className='flex gap-4'>
              <Link href='/'>
                <a className='flex'>
                  <Image alt='' className='h-12' src='/img/bcc_logo.svg' />
                </a>
              </Link>
              <a className='hidden lg:flex' href='https://ifg.edu.br' target='_blank' rel='noreferrer'>
                <Image alt='' className='h-12' src='/img/ifg_logo.svg' />
              </a>
            </div>
            <button aria-controls='mobile-menu-2' aria-expanded='false'
                    className='inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden transition-colors duration-300 focus:outline-none hover:outline-none'
                    data-collapse-toggle='mobile-menu'
                    type='button'>
              <span className='sr-only'>Open main menu</span>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path clipRule='evenodd'
                      d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                      fillRule='evenodd' />
              </svg>
              <svg className='hidden w-6 h-6' fill='currentColor' viewBox='0 0 20 20'
                   xmlns='http://www.w3.org/2000/svg'>
                <path clipRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      fillRule='evenodd' />
              </svg>
            </button>
            <div id='mobile-menu' className='w-full md:block md:w-auto hidden'>
              <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
                {
                  navigation.map(link => (
                    <li key={link.label}>
                      <Link href={link.url}>
                        <a
                          className='block py-2 pr-4 pl-3 text-white border-b border-gray-50/10 md:border-0 md:hover:text-primary md:p-0 transition-color duration-300 uppercase'>{link.label}</a>
                      </Link>
                    </li>
                  ))
                }
                <li>
                  <button id='dropdownNavbarLink'
                          className='flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-white md:border-0 md:hover:text-primary md:p-0 md:w-auto uppercase'
                          data-dropdown-toggle='dropdownNavbar'>
                    Dropdown
                    <svg className='ml-1 w-4 h-4' fill='currentColor' viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'>
                      <path clipRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            fillRule='evenodd' />
                    </svg>
                  </button>

                  <div id='dropdownNavbar'
                       className='hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow '>
                    <ul aria-labelledby='dropdownLargeButton' className='py-1'>
                      <li>
                        <a className='block py-2 px-4 text-sm text-neutral hover:bg-gray-100 '
                           href='#'>Dashboard</a>
                      </li>
                      <li>
                        <a className='block py-2 px-4 text-sm text-neutral hover:bg-gray-100 '
                           href='#'>Settings</a>
                      </li>
                      <li>
                        <a className='block py-2 px-4 text-sm text-neutral hover:bg-gray-100 '
                           href='#'>Earnings</a>
                      </li>
                    </ul>
                    <div className='py-1'>
                      <a className='block py-2 px-4 text-sm text-neutral hover:bg-gray-100 '
                         href='#'>Sign
                        out</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}