import Link from 'next/link';
import Image from 'next/image';

export default function FooterBar({}) {
  const linksUteis = [
    {
      label: 'Moodle',
      href: 'https://moodle.ifg.edu.br',
    },
    {
      label: 'Acadêmico Web',
      href: 'https://academicoweb.ifg.edu.br',
    },
    {
      label: 'IFG Anápolis',
      href: 'https://www.ifg.edu.br/anapolis',
    },
  ];

  return (
    <>
      <footer className="bg-neutral-700">
        <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4 container">
          <div className="space-y-8">
            <Link href="/" className="flex items-center h-10">
              <Image
                alt="Logo de Ciencia da Computação"
                className="mr-4 h-10"
                src="/img/bcc_anapolis_logo.svg"
                layout="fixed"
                height={50}
                width={200}
              />
            </Link>
            <a href="https://ifg.edu.br" className="flex items-center h-10">
              <Image
                alt="Logo de IFG"
                className="mr-4 h-10"
                src="/img/ifg_logo.svg"
                layout="fixed"
                height={50}
                width={200}
              />
            </a>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-neutral-100 uppercase">
              Ciência da Computação
            </h2>
            <ul className="text-neutral-100">
              <li className="mb-4">
                <a href="/pessoas/professores" className=" hover:underline">
                  Professores
                </a>
              </li>
              {/*<li className='mb-4'>*/}
              {/*  <a href='/pessoas/centro-academico' className='hover:underline'>Centro Acadêmico</a>*/}
              {/*</li>*/}
              {/*<li className='mb-4'>*/}
              {/*  <a href='/pessoas/atletica' className='hover:underline'>Atlética</a>*/}
              {/*</li>*/}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-neutral-100 uppercase">
              Links Úteis
            </h2>
            <ul className="text-neutral-100 space-y-4">
              {linksUteis.map((item, index) => (
                <li key={'links-uteis' + index}>
                  {typeof item === 'string' ? (
                    <a href={item} target="_blank" className="hover:underline">
                      {item}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      className="hover:underline"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              {/*<li className='mb-4'>*/}
              {/*  <a href='#' className='hover:underline'>Facebook*/}
              {/*  </a></li>*/}
              {/*<a href='#' className='hover:underline'>*/}
              {/*</a>*/}
              {/*<li className='mb-4'><a href='#' className='hover:underline'>*/}
              {/*</a><a href='#' className='hover:underline'>Contact Us</a>*/}
              {/*</li>*/}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-neutral-100 uppercase">
              Endereço
            </h2>
            <p className="text-neutral-100">
              Av. Pedro Ludovico, s/n
              <br />
              Residencial Reny Cury, Anápolis
              <br />
              GO, 75131-457
            </p>
            {/*<ul className='text-neutral-100'>*/}
            {/*  <li className='mb-4'>*/}
            {/*    <a href='#' className='hover:underline'>Privacy Policy</a>*/}
            {/*  </li>*/}
            {/*  <li className='mb-4'>*/}
            {/*    <a href='#' className='hover:underline'>Licensing</a>*/}
            {/*  </li>*/}
            {/*  <li className='mb-4'>*/}
            {/*    <a href='#' className='hover:underline'>Terms &amp; Conditions</a>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </div>
        </div>
        <div className="py-6 md:flex md:items-center md:justify-between container border-t">
          <p className="text-sm text-neutral-100 sm:text-center">
            © {new Date().getFullYear()} Ciência da Computação. Todos Direitos
            Reservados.
          </p>
          <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            {/*Instagram*/}
            <a
              href="https://www.instagram.com/ifg.anapolis.oficial"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-100 hover:text-primary transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/*GitHub*/}
            <a
              href="https://github.com/bccanapolis"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-100 hover:text-primary transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="pb-6 container">
          <p className="text-sm text-neutral-100 sm:text-center">
            Desenvolvido
            {/*com <a*/}
            {/*className='underline hover:text-primary transition-colors duration-300' href='https://tailwindcss.com/'*/}
            {/*target='_blank' rel='noreferrer'>TailwindCSS</a> e <a*/}
            {/*className='underline hover:text-primary transition-colors duration-300' href='https://nextjs.org/'*/}
            {/*target='_blank' rel='noreferrer'>NextJS</a> */} por{' '}
            <a
              className="underline hover:text-primary transition-colors duration-300"
              href="https://www.baraus.dev?ref=bcc.ifg.edu.br"
              target="_blank"
            >
              baraus.dev
            </a>
            {/*<a className='underline hover:text-primary transition-colors duration-300' href='https://codetower.com.br'*/}
            {/*   target='_blank' rel='noreferrer'>Code Tower</a>*/}
          </p>
        </div>
      </footer>
    </>
  );
}
