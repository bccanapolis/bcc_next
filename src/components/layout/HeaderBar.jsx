//https://tailwindui.com/components/marketing/elements/headers

import { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { classNames } from '@/utils';
import { useRouter } from 'next/router';

const navigation = [
  {
    url: '/',
    label: 'Home'
  },
  {
    url: '',
    label: 'pessoas',
    dropdown: [
      {
        url: '/pessoas/alunos',
        label: 'Alunos'
      },
      {
        url: '/pessoas/egressos',
        label: 'egressos'
      },
      {
        url: '/pessoas/professores',
        label: 'professores'
      },
      {
        url: '/pessoas/centro-academico',
        label: 'Centro Acadêmico'
      }
    ]
  },
  {
    url: '',
    label: 'pesquisa',
    dropdown: [
      {
        url: '/pesquisa/gecomp',
        label: 'gecomp'
      },
      {
        url: 'https://www.ifg.edu.br/citelab',
        label: 'citelab',
        external: true
      },
      {
        url: 'https://www.ifg.edu.br/embrapii',
        label: 'embrapii',
        external: true
      }

    ]
  },
  {
    url: '',
    label: 'ensino',
    dropdown: [
      {
        url: '/ensino/tecnico-integrado',
        label: 'Técnico Integrado'
      },
      {
        url: '/ensino/graduacao',
        label: 'Graduação'
      },
      {
        url: '/ensino/pos-graduacao',
        label: 'Pós Graduação'
      }
    ]
  },
  {
    url: '',
    label: 'extensão',
    dropdown: [
      {
        url: '/extensao/projetos',
        label: 'Projetos'
      },
      {
        url: '/extensao/empresa-junior',
        label: 'Empresa Junior'
      }
    ]
  }
];


function NavLinks({ closeParent }) {
  return (
    <>
      {
        navigation.map(link => (
          !!link.dropdown ?
            <Popover key={link.label} className='relative'>
              {({ open, close }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-primary' : 'text-white',
                      'group bg-neutral rounded-md inline-flex items-center text-base font-medium hover:text-primary focus:outline-none uppercase'
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden='true'
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel
                      className='absolute z-10 left-0 -ml-7 mt-3 transform px-2 w-max sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'>
                      <div className='overflow-hidden'>
                        <div className='relative grid gap-6 bg-neutral px-5 py-6 sm:gap-8 sm:p-8'>
                          {link.dropdown.map((item, index) => (
                            <Link key={item.label + index + item.url}
                                  href={item.url}>
                              <a
                                onClick={() => {
                                  close();
                                  closeParent();
                                }}
                                className='-m-3 p-3 flex items-start rounded-lg group'
                              >
                                <p
                                  className='text-base font-medium text-white group-hover:text-primary uppercase'>{item.label}</p>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            :
            link.external ?
              <a key={link.label} href={link.url} target='_blank' rel='noreferrer'
                 className='text-base font-medium text-white hover:text-primary uppercase'>
                {link.label}
              </a>
              :
              <Link key={link.label} href={link.url}>
                <a className='text-base font-medium text-white hover:text-primary uppercase'>
                  {link.label}
                </a>
              </Link>
        ))
      }
    </>
  );
}


export default function Example() {
  const router = useRouter();
  useEffect(() => {
  }, [router.asPath]);

  return (
    <Popover className='relative bg-neutral z-50'>
      {({ close }) =>
        <>
          <div className='container'>
            <div
              className='flex flex-row md:flex-col xl:flex-row justify-between items-center py-4 md:justify-start md:space-x-10'>
              <div className='flex justify-start lg:flex-1 gap-x-4'>
                <Link href='/'>
                  <a>
                    <span className='sr-only'>Ciência da Computação</span>
                    <Image
                      className='h-8 w-auto'
                      src='/img/bcc_anapolis_logo.svg'
                      width={200}
                      height={45}
                      layout='fixed'
                    />
                  </a>
                </Link>

                <a className='hidden md:inline-block' href='https://ifg.edu.br'>
                  <span className='sr-only'>Ciência da Computação</span>
                  <Image
                    className='h-8 w-auto'
                    src='/img/ifg_logo.svg'
                    width={160}
                    height={40}
                    layout='fixed'
                  />
                </a>

              </div>
              <div className='-mr-2 -my-2 md:hidden'>
                <Popover.Button
                  className='bg-neutral rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'>
                  <span className='sr-only'>Open menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <Popover.Group as='nav' className='hidden md:flex md:flex-1 space-x-10'>
                <NavLinks closeParent={close} />
              </Popover.Group>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel focus
                           className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
              <div className='shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral divide-y-2 divide-gray-50'>
                <div className='pt-5 pb-6 px-5'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Image
                        className='h-8 w-auto'
                        src='/img/bcc_logo.svg'
                        width='200px'
                        height='40px'
                        layout='fixed'
                      />
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button
                        className='bg-neutral rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'>
                        <span className='sr-only'>Close menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='mt-6'>
                    <nav className='grid gap-y-8'>
                      <NavLinks closeParent={close} />
                    </nav>
                  </div>
                </div>
                <div className='py-6 px-5 space-y-6'>
                  <div>
                    <a href='https://ifg.edu.br'>
                      <span className='sr-only'>Ciência da Computação</span>
                      <Image
                        className='h-8 w-auto'
                        src='/img/ifg_logo.svg'
                        width={160}
                        height={40}
                        layout='fixed'
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      }
    </Popover>
  );
}
