import { ChevronDownIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function HeaderNavTree({ links, isChild }) {
  return (
    <>
      {
        links.map(link => (
          <li key={link.label}>
            {
              !!link.dropdown ?
                <>
                  <button
                    className='flex justify-between items-center py-2 pr-4 pl-3 w-full text-white md:border-0 md:hover:text-primary md:p-0 md:w-auto uppercase'
                    data-dropdown-toggle={`dropdown-${link.label}`}>
                    {link.label}
                    <ChevronDownIcon className='ml-1 w-4 h-4' />
                  </button>

                  <div id={`dropdown-${link.label}`}
                       className='hidden z-10 w-44 text-base list-none bg-neutral/90 divide-y divide-gray-100 shadow py-2'>
                    <ul aria-labelledby={`dropdown-${link.label}-button`} className='px-0 sm:py-1 sm:px-3 space-y-2'>
                      <HeaderNavTree links={link.dropdown} child={isChild} />
                      {/*<li key={`${link.label}-${item.label}`}>*/}
                      {/*  <Link href={item.url}>*/}
                      {/*    <a*/}
                      {/*      className='block py-2 px-4 text-sm text-white hover:bg-neutral uppercase'>{item.label}</a>*/}
                      {/*  </Link>*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </>
                :
                link.external ?
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noreferrer'
                    className='block py-2 pr-4 pl-3 text-white border-0 md:hover:text-primary md:p-0 transition-color duration-300 uppercase'>{link.label}</a>
                  :
                  <Link href={link.url}>
                    <a
                      className='block py-2 pr-4 pl-3 text-white border-0 md:hover:text-primary md:p-0 transition-color duration-300 uppercase'>{link.label}</a>
                  </Link>
            }
          </li>
        ))
      }

    </>
  );
}