import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { classNames } from '@/utils';
import Container from '@/components/layout/Container';

export default function GameBannerYears({
  section = {},
  games,
  className,
  classTitle,
}) {
  const image = [
    '/img/game_background_4 1.png',
    '/img/game_background_2 1.png',
    '/img/game_background_1 1.png',
  ];

  return (
    <Container className={className}>
      <div
        className={classNames(
          (!!section.subtitle || !!section.title) && 'space-y-2 mb-12'
        )}
      >
        <h6
          className={classNames(
            classTitle ?? 'text-4xl font-bold text-center',
            !section.title && 'hidden'
          )}
        >
          {section.title}
        </h6>
        <p
          className={classNames(
            'font-light text-center',
            !section.subtitle && 'hidden'
          )}
        >
          {section.subtitle}
        </p>
      </div>
      <div>
        <Swiper
          className="swiper-overflow"
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: Math.min(games.length, 2) },
            768: { slidesPerView: Math.min(games.length, 3) },
          }}
          autoplay={{
            delay: 5000,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
        >
          {games.map((game, index) => (
            <SwiperSlide
              key={`game-section-${game}`}
              className="flex flex-col items-center w-full overflow-hidden"
            >
              {
                <Link href={`/acoes-ensino/projetos/games/${game}`}>
                  <a
                    style={{
                      backgroundImage: `url('${image[index % image.length]}')`,
                    }}
                    className="w-full h-32 flex justify-center items-center game-image bg-center bg-cover relative after:opacity-50 after:w-full after:h-full after:bg-neutral-900 after:absolute z-0 after:z-10 hover:after:opacity-25 after:transition-color after:duration-300"
                  >
                    <div className="text-3xl text-neutral-100 font-bold z-20">
                      {game}
                    </div>
                  </a>
                </Link>
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}
