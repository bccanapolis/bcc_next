import { DocumentTextIcon } from '@heroicons/react/outline';
import { cloneElement } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

export default function ProfessorProducaoTimeline({ id, title, producao, icon, defaultOpen = false }) {
  if (!producao) return <></>;

  function prependSpace(match, capture) {
    return match.split('').join(' ');
  }

  return (
    <Disclosure defaultOpen={defaultOpen} as='div'>
      {
        ({ open }) =>
          <>
            <Disclosure.Button as='div'
                               className='flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left bg-neutral-50 rounded-lg hover:bg-neutral-100 hover:cursor-pointer'>
              <h6 className='text-xl font-semibold'>{title}
              </h6>
              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel as='ol' className='relative border-l border-neutral-200 ml-4 mt-8 px-4'>
                {
                  producao.map((item, index) =>
                    <li key={`${id}-${index}`} className='mb-6 ml-6'>
                      <span
                        className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-neutral-200 rounded-full ring-8 ring-white'>
                        {
                          icon ?
                            cloneElement(
                              icon,
                              {
                                className: 'w-3 h-3 text-primary'
                              }
                            ) :
                            <DocumentTextIcon className='w-3 h-3 text-primary' />
                        }
                      </span>
                      {
                        (item.tipo && item.producao) &&
                        <h3
                          className='mb-1 text-lg font-medium text-neutral-900 capitalize'>
                          {item.tipo}
                          <span
                            className='text-neutral-200 mx-1 inline-block'>-</span>{item.producao.replace(/((\w)\()/, prependSpace)}
                        </h3>
                      }
                      {
                        (!item.tipo && item.producao) &&
                        <h3
                          className='mb-1 text-lg font-medium text-neutral-900 capitalize'>{item.producao.replace(/((\w)\()/, prependSpace)}
                        </h3>
                      }
                      {
                        item.titulo &&
                        <h3
                          className='mb-1 text-lg font-medium text-neutral-900 capitalize'>{item.titulo}
                        </h3>
                      }
                      {
                        item.ano &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Ano: {item.ano}
                        </time>
                      }
                      {
                        item.ano_inicio &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Início: {item.ano_inicio}<span
                          className='text-neutral-200 mx-1'>|</span>Conclusão: {item.ano_conclusao}
                        </time>
                      }
                      {
                        item.data_inicio &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Início: {item.data_inicio}<span
                          className='text-neutral-200 mx-1'>|</span>Término: {item.data_termino}
                        </time>
                      }
                      {
                        item.ano_producao &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Data de
                          Publicação: {item.ano_producao}
                        </time>
                      }
                      {
                        item.ano_producao_tecnica &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Ano: {item.ano_producao_tecnica}
                        </time>
                      }
                      {
                        item.data_registro &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Ano: {item.data_registro}
                        </time>
                      }
                      {
                        item.ano_orientacao &&
                        <time
                          className='block mb-2 text-sm font-light leading-none text-neutral-500'>Ano: {item.ano_orientacao}
                        </time>
                      }
                      {
                        item.revista_publicado &&
                        <p className='text-base font-normal text-neutral-700'>
                          {item.revista_publicado}
                        </p>
                      }
                      {
                        item.natureza &&
                        <p className='text-base font-normal text-neutral-700'>
                          {item.natureza}
                        </p>
                      }
                      {
                        item.orgao_do_projeto &&
                        <p className='text-base font-normal text-neutral-700'>
                          {item.orgao_do_projeto}
                        </p>
                      }
                      {
                        item.tipo_orientacao &&
                        <p className='text-base font-normal text-neutral-700'>
                          {item.tipo_orientacao}
                        </p>
                      }
                      {
                        item.nome_instituicao &&
                        <p className='text-base font-normal text-neutral-700'>
                          {item.nome_instituicao}
                        </p>
                      }
                    </li>
                  )
                }
              </Disclosure.Panel>
            </Transition>
          </>
      }
    </Disclosure>
  );
}