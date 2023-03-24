import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function breadcrumb({ paths }) {
  function handleReloadPage(path) {
    if (path === window.location.href) return;
    window.location = path;
  }

  return (
    <>
      <nav aria-label="breadcrumb" className="flex py-3 px-4 text-neutral-700">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {paths.map((link, index) => (
            <li
              key={link.label}
              aria-current={index === paths.length - 1 && 'page'}
              className="inline-flex items-center"
            >
              {index != 0 && (
                <ChevronRightIcon className="mr-2 w-4 h-4 text-neutral-100" />
              )}
              {!!link.dropdown ? (
                <>
                  <button
                    className="inline-flex items-center text-sm font-medium text-neutral-100 hover:text-primary uppercase"
                    data-dropdown-toggle={`dropdown-${link.label}`}
                  >
                    {link.label}
                    <ChevronDownIcon className="ml-1 w-4 h-4" />
                  </button>
                  <div
                    id={`dropdown-${link.label}`}
                    className={`hidden z-10 w-44 text-base list-none bg-neutral-100 divide-y divide-neutral-100 shadow`}
                  >
                    <ul>
                      {link.dropdown.map((item, index) => (
                        <li key={index}>
                          {item.reload ? (
                            <span
                              onClick={() =>
                                handleReloadPage(
                                  `${window.location.origin}${item.url}`
                                )
                              }
                              className="block py-2 px-4 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                            >
                              {item.label}
                            </span>
                          ) : (
                            <Link
                              href={item.url}
                              className="block py-2 px-4 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                            >
                              {item.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : !link.disabled ? (
                <>
                  <Link
                    href={link.url}
                    className="inline-flex items-center text-sm font-medium text-neutral-100 hover:text-primary uppercase"
                  >
                    {link.label}
                  </Link>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center text-sm font-medium text-neutral-300 uppercase">
                    {link.label}
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
