import Banner from '@/components/layout/Banner';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function GameSection({ section={}, games, className }) {
  return (
    <>
      <Banner className={className} childPadding={false}
              images={[{ url: '/img/game_background_3.1.png', alt: 'Paisagem de Jogo' }]}>
        <div className='container flex flex-col lg:flex-row py-20 gap-y-8'>
          <div className='w-full lg:w-8/12'>
            <p className='text-4xl font-bold text-neutral-100'>{section.title || 'Section title.'}</p>
          </div>
          <div className='w-full lg:w-4/12 flex items-center lg:justify-end'>
            <Menu as='div' className='relative w-full lg:w-max'>
              <Menu.Button
                className='bg-neutral-100 py-2 px-4 uppercase  font-medium font-sm w-full lg:w-max hover:bg-primary hover:text-neutral-100 transition-colors duration-300'>Acessar</Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  className='absolute left-0 w-full max-h-64 overflow-hidden overflow-y-auto origin-top-right bg-neutral-100 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <ul>
                    {
                      games.map(item =>
                        <Menu.Item key={`game-section-${item}`}>
                          <li>
                            <Link href={`/extensao/projetos/games/${item}`}>
                              <a
                                className='py-2 px-4 hover:bg-primary hover:text-neutral-100 transition-colors duration-300 inline-flex justify-center w-full'>{item}</a>
                            </Link>
                          </li>
                        </Menu.Item>
                      )
                    }
                  </ul>
                </Menu.Items>
              </Transition>
            </Menu>

          </div>
        </div>
      </Banner>

    </>
  );
}