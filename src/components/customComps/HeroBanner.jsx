"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import hero from "../../../sanity/schemas/hero";
import { urlForImage } from "../../../sanity/lib/image";
import { getHero } from "@lib/sanityActions";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade, Autoplay } from "swiper/modules";
// import Swiper and modules styles
// Import Swiper styles
import "swiper/css";

const HeroBanner = () => {
  const [hero, setHero] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchHero = async () => {
      try {
        setLoading(true);
        const data = await getHero();
        if (data === null || data === undefined) {
        }
        setHero(data);
      } catch (error) {
        console.error("Error fetching hero:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();

    return () => {
      // Cancel the ongoing network request
      abortController.abort();
    };
  }, []);
  console.log(hero);
  return (
    <Swiper
      className="w-full h-[calc(100vh-4rem)] overflow-hidden"
      modules={[A11y, EffectFade, Autoplay]}
      slidesPerView={1}
      effect="fade"
      loop={true}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
    >
      {hero.map((h) => (
        <SwiperSlide key={h._id} className="w-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <div className="relative h-full overflow-hidden">
              <Image
                className="w-screen object-cover"
                fill
                referrerPolicy="no-referrer"
                src={urlForImage(h.images)}
                alt={h.smallText}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HeroBanner;
