'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from '@/styles/accordion.module.css';

export interface Slide {
  id: string;
  image: {
    url: string;
    alt?: string;
  };
  titleTop: string;
  titleBottom: string;
  metaTop: string;
  metaBottom: string;
}

interface AccordionSliderProps {
  slides: Slide[];
  className?: string;
  title?: string;
}

export default function AccordionSlider({ slides, title }: AccordionSliderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(slides.length).fill(false));
  const [mobileVisible, setMobileVisible] = useState(false);
  const swiperRef = useRef<any>(null);
  const mobileSliderRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const mobileTextRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(new Array(slides.length).fill(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            slides.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, 150 + (index * 250));
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -250px 0px' }
    );

    if (cardRefs.current[0]) {
      observer.observe(cardRefs.current[0]);
    }

    return () => {
      if (cardRefs.current[0]) {
        observer.unobserve(cardRefs.current[0]);
      }
    };
  }, [slides.length]);

  useEffect(() => {
    const s = (swiperRef.current as any)?.swiper;
    if (s) {
      try {
        s.updateSize();
        s.updateSlides();
        s.update();
      } catch {}
    }
  }, [visibleCards]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -200px 0px' }
    );

    if (mobileSliderRef.current) {
      observer.observe(mobileSliderRef.current);
    }

    return () => {
      if (mobileSliderRef.current) {
        observer.unobserve(mobileSliderRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.accordionSection}>
      {title && (
        <h2 
          className={styles.sectionTitle}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      <div className={styles.desktopAccordion}>
        <div className={styles.accordion}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`${styles.slide} ${
                hoveredIndex === index ? styles.expanded : ''
              } ${hoveredIndex === null && index === 0 ? styles.defaultExpanded : ''} fade-in-section ${visibleCards[index] ? 'is-visible' : ''}`}
            >
              <div 
                className={styles.imageWrapper}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || slide.titleTop}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.image}
                  priority={index === 0}
                />
                <div className={styles.overlay} />
              </div>
              
              <div className={styles.content}>
                <div className={styles.upperText}>
                  <div className={styles.titleLine}>{slide.titleTop}</div>
                  <div className={styles.metaLine}>{slide.titleBottom}</div>
                </div>
                <div className={styles.lowerText}>
                  <div className={styles.titleLine}>{slide.metaTop}</div>
                  <div className={styles.metaLine}>{slide.metaBottom}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.mobileSlider} fade-in-section ${mobileVisible ? 'is-visible' : ''}`} ref={mobileSliderRef}>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={0}
          observer
          observeParents
          onInit={(swiper) => {
            try {
              swiper.updateSize();
              swiper.updateSlides();
              swiper.update();
            } catch {}
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.activeIndex);
          }}
          className={styles.swiper}
          style={{ width: '100%' }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className={styles.imageWrapper}>
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || slide.titleTop}
                  fill
                  sizes="100vw"
                  className={styles.image}
                  priority={index === 0}
                />
                <div className={styles.overlay} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.mobileNavigation} ref={mobileNavRef}>
          <button 
            className={`${styles.navButton} ${styles.prevButton} ${currentSlide === 0 ? styles.disabled : ''}`}
            aria-label="Previous slide"
            onClick={() => {
              const s = (swiperRef.current as any)?.swiper;
              if (!s) {
                return;
              }
              s.slidePrev();
            }}
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowLeft}>
              <path d="M19.6667 10L1 10M13 2L21 10L13 18" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className={`${styles.navButton} ${styles.nextButton} ${currentSlide === slides.length - 1 ? styles.disabled : ''}`}
            aria-label="Next slide"
            onClick={() => {
              const s = (swiperRef.current as any)?.swiper;
              if (!s) {
                return;
              }
              s.slideNext();
            }}
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowRight}>
              <path d="M19.6667 10L1 10M13 2L21 10L13 18" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.mobileText} ref={mobileTextRef}>
          {slides.map((slide, index) => (
            <div
              key={`text-${slide.id}`}
              className={`${styles.textContent} ${index === currentSlide ? styles.active : ''}`}
            >
              <div className={styles.upperText}>
                <div className={styles.titleLine}>{slide.titleTop}</div>
                <div className={styles.metaLine}>{slide.titleBottom}</div>
              </div>
              <div className={styles.lowerText}>
                <div className={styles.titleLine}>{slide.metaTop}</div>
                <div className={styles.metaLine}>{slide.metaBottom}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
