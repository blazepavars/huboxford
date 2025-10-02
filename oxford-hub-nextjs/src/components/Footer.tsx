import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

interface FooterProps {
  footerLogo?: {
    url: string;
    label: string;
  };
  privacyText?: string;
  privacyUrl?: string;
  termsText?: string;
  termsUrl?: string;
  cookiesText?: string;
  cookiesUrl?: string;
}

export default function Footer({
  footerLogo,
  privacyText,
  privacyUrl,
  termsText,
  termsUrl,
  cookiesText,
  cookiesUrl
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          {footerLogo ? (
            <Link 
              href="https://www.oxfordproperties.com/?utm_source=hub&utm_medium=footer&utm_campaign=the_hub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image 
                src={footerLogo.url}
                alt={footerLogo.label || "Company Logo"}
                width={155}
                height={44}
                className={styles.logoImage}
              />
            </Link>
          ) : (
            <Link 
              href="https://www.oxfordproperties.com/?utm_source=hub&utm_medium=footer&utm_campaign=the_hub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>OXFORD</span>
            </Link>
          )}
        </div>
        <div className={styles.footerLinks}>
          {privacyText && privacyUrl && (
            <Link href={privacyUrl} className={styles.footerLink}>
              {privacyText}
            </Link>
          )}
          {termsText && termsUrl && (
            <Link href={termsUrl} className={styles.footerLink}>
              {termsText}
            </Link>
          )}
          {cookiesText && cookiesUrl && (
            <Link href={cookiesUrl} className={styles.footerLink}>
              {cookiesText}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}