import Banner from "@/components/layout/Banner";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GameSection({ section={}, games, className })
{
  return(
    <div className="Container">
      <div className='space-y-2 mb-12'>
        <h6 className="text-4xl font-bold text-center">{section.title}</h6>
        <p className="font-light text-center">{section.subtitle}</p>
      </div >
      <div className='space-y-2 mb-12'>
        <Swiper className='swiper-overflow clear-both'
          spaceBetween={10}
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
          onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
          >
          {

          games.map(game =>(
            <SwiperSlide key={`game-section-${game}`}  className='flex flex-col items-center group'>{
              <Link href={`/extensao/projetos/games/${game}`}>
                <a className="text-3xl font-bold text-slate-600 group-hover:text-primary ">
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