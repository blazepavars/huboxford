'use client';

import Image from 'next/image';
import styles from '@/styles/intro.module.css';
import { useEffect, useRef, useState } from 'react';

interface IntroSectionProps {
  torontoSkylineImage?: {
    url: string;
    label: string;
  };
  platformHeading?: string;
  destinationHeading?: string;
  description?: string;
}

export default function IntroSection({
  torontoSkylineImage,
  platformHeading,
  destinationHeading,
  description
}: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className={styles.intro}>
      <div 
        ref={ref}
        className={`${styles.imageContainer} fade-in-section ${isVisible ? 'is-visible' : ''}`}
      >
        {torontoSkylineImage ? (
          <Image
            src={torontoSkylineImage.url}
            alt={torontoSkylineImage.label}
            fill
            className={styles.skylineImage}
          />
        ) : null}
      </div>
      <div className={styles.content}>
        {(platformHeading || destinationHeading) && (
          <h2 className={styles.heading}>
            {platformHeading}
            {platformHeading && destinationHeading && <br />}
            {destinationHeading && (
              <span className={styles.highlight}>
                {destinationHeading}
              </span>
            )}
          </h2>
        )}
        {description && (
          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </section>
  );
}