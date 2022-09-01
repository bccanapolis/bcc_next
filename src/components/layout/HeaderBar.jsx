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
      },      {
        url: '/pessoas/atletica',
        label: 'Atlética'
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
        url: 'http://cursos.ifg.edu.br/info/bach/bach-ciencia-da-computacao/CP-ANAPOLI',
        label: 'Graduação',
        external: true,
      },
      {
        url: 'http://cursos.ifg.edu.br/info/esp/e-iap/CP-ANAPOLI',
        label: 'Pós Graduação',
        external: true,
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
  },
  {
    url: '/blog',
    label: 'blog'
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
                      open ? 'text-primary' : 'text-neutral-100',
                      'group bg-neutral-700 rounded-md inline-flex items-center text-sm font-medium hover:text-primary focus:outline-none uppercase'
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-primary' : 'text-neutral-500',
                        'ml-2 h-5 w-5 group-hover:text-primary'
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
                      className='absolute z-10 left-0 -ml-7 mt-3 transform px-2 w-screen max-w-md md:w-max sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'>
                      <div className='overflow-hidden'>
                        <div className='relative grid gap-6 bg-neutral-700 px-4 py-6 sm:gap-8 sm:p-8'>
                          {link.dropdown.map((item, index) => (
                            item.external ?
                              <a
                                key={item.label + index + item.url}
                                target='_blank' rel='noreferrer'
                                href={item.url}
                                className='-m-2 p-2 flex items-start rounded-lg group'
                              >
                                <p
                                  className='text-sm font-medium text-neutral-100 group-hover:text-primary uppercase'>{item.label}</p>
                              </a>
                              :
                            <Link key={item.label + index + item.url}
                                  href={item.url}>
                              <a
                                onClick={() => {
                                  close();
                                  closeParent();
                                }}
                                className='-m-2 p-2 flex items-start rounded-lg group'
                              >
                                <p
                                  className='text-sm font-medium text-neutral-100 group-hover:text-primary uppercase'>{item.label}</p>
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
                 className='text-neutral-100 inline-flex items-center text-sm font-medium hover:text-primary focus:outline-none uppercase'>
                {link.label}
              </a>
              :
              <Link key={link.label} href={link.url}>
                <a onClick={closeParent} className='text-neutral-100 inline-flex items-center text-sm font-medium hover:text-primary focus:outline-none uppercase'>
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
    <Popover className='relative bg-neutral-700 z-50'>
      {({ close }) =>
        <>
          <div className='container'>
            <div
              className='flex flex-row md:flex-col xl:flex-row justify-between items-center py-4 md:justify-start lg:space-x-10'>
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
                      loading='eager'
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
                    loading='eager'
                  />
                </a>

              </div>
              <div className='-mr-2 -my-2 md:hidden'>
                <Popover.Button
                  className='bg-neutral-700 rounded-md p-2 inline-flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none'>
                  <span className='sr-only'>Open menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <Popover.Group as='nav' className='hidden md:flex md:flex-1 space-x-8'>
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
              <div className='shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral-700 divide-y-2 divide-neutral-50'>
                <div className='pt-4 pb-6 px-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Image
                        className='h-8 w-auto'
                        src='/img/bcc_logo.svg'
                        width='200px'
                        height='40px'
                        layout='fixed'
                        loading='eager'
                      />
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button
                        className='bg-neutral-700 rounded-md p-2 inline-flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none'>
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
                <div className='py-6 px-4 space-y-6'>
                  <div>
                    <a href='https://ifg.edu.br'>
                      <span className='sr-only'>Ciência da Computação</span>
                      <Image
                        className='h-8 w-auto'
                        src='/img/ifg_logo.svg'
                        width={160}
                        height={40}
                        layout='fixed'
                        loading='eager'
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
