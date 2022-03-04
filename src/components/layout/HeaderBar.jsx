import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/context/Global';
import { ChevronDownIcon } from '@heroicons/react/outline';
import HeaderNavTree from '@/components/HeaderNavTree';
import slugify from 'slugify';


export default function HeaderBar({}) {
  const globalContext = useContext(GlobalContext);

  const rawNav = {
    home: {
      url: '/',
      label: 'Home'
    },
    pessoas: {
      url: '',
      label: 'pessoas',
      dropdown: [
        {
          url: '/ex-alunos',
          label: 'ex-alunos'
        },
        {
          url: '/professores',
          label: 'professores'
        },
        {
          url: '/ca',
          label: 'CA'
        }
      ]
    },
    pesquisa: {
      url: '',
      label: 'pesquisa',
      dropdown: [
        {
          url: '/gecomp',
          label: 'gecomp'
        },
        {
          url: '/citelab',
          label: 'citelab'
        },
        {
          url: 'https://www.ifg.edu.br/embrapii',
          label: 'embrapii',
          external: true
        }

      ]
    },
    projetos: {
      url: '',
      label: 'projetos',
      dropdown: []
    },
    games: {
      url: '/games',
      label: 'games',
      dropdown: []
    }
  };

  const [navigation, setNavigation] = useState([...Object.values(rawNav)]);

  useEffect(() => {
    if (globalContext.years instanceof Array && globalContext.years.length) {
      rawNav['games']['dropdown'] = globalContext.years.sort((a, b) => b - a).map(item => ({
        url: `/games/${item}`,
        label: item
      }));
      setNavigation([...Object.values(rawNav)]);
    }

    if (globalContext.projects instanceof Array && globalContext.projects.length) {
      rawNav['projetos']['dropdown'] = globalContext.projects.map(item => ({
        url: `/projects#${slugify(item.toLowerCase())}`,
        label: item
      }));
      setNavigation([...Object.values(rawNav)]);
    }
  }, [globalContext.years, globalContext.projects]);

  return (
    <>
      <header className='absolute top-0 z-40 w-full'>
        <nav className={'px-2 transition-colors duration-300 ease-linear bg-neutral/90'}>
          <div className='container flex flex-wrap justify-between items-center'>
            <div className='flex gap-4 py-3'>
              <Link href='/'>
                <a className='flex'>
                  <Image alt='' className='h-12' src='/img/bcc_logo.svg' height='40px' width='200px' />
                </a>
              </Link>
              <a className='hidden lg:flex' href='https://ifg.edu.br' target='_blank' rel='noreferrer'>
                <Image alt='' className='h-12' src='/img/ifg_logo.svg' layout='fixed' height='40px' width='200px' />
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
              <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm'>
                <HeaderNavTree links={navigation} />
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}