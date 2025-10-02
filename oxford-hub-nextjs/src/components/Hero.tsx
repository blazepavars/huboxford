import Image from 'next/image';
import styles from '@/styles/hero.module.css';

interface HeroProps {
  herologo?: {
    url: string;
    label: string;
  };
  mainHeading?: string;
  subHeading?: string;
}

export default function Hero({ 
  herologo,
  mainHeading,
  subHeading
}: HeroProps) {
  const subHeadingWords = subHeading ? subHeading.split(' ') : [];
  const firstLine = subHeadingWords.slice(0, 3).join(' ').toUpperCase();
  const secondLine = subHeadingWords.slice(3).join(' ').toUpperCase();
  
  return (
    <section className={styles.hero}>
      {herologo && (
        <div className={styles.logo}>
          <Image 
            src={herologo.url}
            alt={herologo.label || "Oxford Properties Logo"}
            width={60}
            height={111}
            className={styles.logoImage}
            priority
          />
        </div>
      )}
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          {mainHeading}
          {subHeading && (
            <>
              <br />
              <span 
                className={styles.subtitle}
                dangerouslySetInnerHTML={{ __html: subHeading }}
              />
            </>
          )}
        </h1>
      </div>
    </section>
  );
}