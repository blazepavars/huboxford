import Image from 'next/image';
import styles from '@/styles/contact.module.css';

interface ContactSectionProps {
  mainHeading?: string;
  subHeading?: string;
  contactName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  buttonText?: string;
  buttonLink?: string;
  ctaLogo?: {
    url: string;
    label: string;
  };
}

export default function ContactSection({
  mainHeading,
  subHeading,
  contactName,
  companyName,
  email,
  phone,
  buttonText,
  buttonLink,
  ctaLogo
}: ContactSectionProps) {
  return (
    <section className={styles.contact}>
      <div className={styles.content}>
        {mainHeading && <h2 className={styles.title}>{mainHeading}</h2>}
        {subHeading && <p className={styles.subtitle}>{subHeading}</p>}
      </div>
      
      <div className={styles.contactInfo}>
        <div className={styles.person}>
          <div className={styles.contactDetailsContainer}>
            <div className={styles.contactDetails}>
              {contactName && <h3 className={styles.name}>{contactName}</h3>}
              {companyName && <p className={styles.companyName}>{companyName}</p>}
              <div className={styles.details}>
                {email && (
                  <a href={`mailto:${email}`} className={styles.email}>
                    {email}
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className={styles.phone}>
                    {phone}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {buttonText && buttonLink && (
            <a href={buttonLink} className={styles.contactButton}>
              {buttonText}
            </a>
          )}
        </div>
        
        <div className={styles.logo}>
          {ctaLogo ? (
            <Image 
              src={ctaLogo.url}
              alt={ctaLogo.label || "The Hub 30 Bay"}
              width={85}
              height={154}
              className={styles.logoImage}
              priority
            />
          ) : (
            <div className={styles.logoBox}>
              <span className={styles.logoText}>THE HUB</span>
              <span className={styles.logoSubtext}>30 BAY</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}