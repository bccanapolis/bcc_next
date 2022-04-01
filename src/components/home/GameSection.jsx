import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GameSection({ section={}, games, className })
{
  return(
    <div className="container">
      <div className="space-y-2 mb-12">
        <h6 className="text-4xl font-bold text-center">{section.title}</h6>
        <p className="font-light text-center">{section.subtitle}</p>
      </div>
      <div>
        <Swiper className='swiper-overflow'
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 5000
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          >
          {

          games.map(game =>(
            <SwiperSlide key={`game-section-${game}`}  className='flex flex-col items-center group'>{
              <Link href={`/extensao/projetos/games/${game}`}>
                <a className="text-3xl font-bold text-neutral-600 group-hover:text-primary ">
                    {game}
                 </a>
              </Link>
            }</SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </div>
  )
}