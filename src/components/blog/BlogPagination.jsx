import { classNames } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

export default function BlogPagination({ searchPosts, page }) {
  return (
    <nav aria-label='Navegação da Página' className='flex items-center justify-center w-full'>
      <ul className='inline-flex items-center -space-x-px'>
        <li className={classNames(page.page <= 1 && 'invisible')}>
          <button onClick={() => searchPosts({ nextPage: page.page - 1 })}
                  className={'block py-2.5 px-2 ml-0 leading-tight text-neutral-500 hover:text-white hover:bg-primary'}>
            <span className='sr-only'>Previous</span>
            <ChevronLeftIcon className='w-5 h-5' />
          </button>
        </li>
        {[...Array(page.maxPages).keys()].map((item, index) => (<li key={'pages-' + index}>
          <button onClick={() => searchPosts({ nextPage: index + 1 })}
                  className={classNames('py-2 px-3 leading-tight hover:text-white hover:bg-primary ', index + 1 == page.currentPage ? 'text-white bg-primary' : 'text-neutral-500')}>{index + 1}</button>
        </li>))}
        <li className={classNames(page.page == page.maxPages && 'invisible')}>
          <button onClick={() => searchPosts({ nextPage: page.page + 1 })}
                  className='block py-2.5 px-2 leading-tight text-neutral-500 hover:text-white hover:bg-primary'>
            <span className='sr-only'>Next</span>
            <ChevronRightIcon className='w-5 h-5' />
          </button>
        </li>
      </ul>
    </nav>
  );
}