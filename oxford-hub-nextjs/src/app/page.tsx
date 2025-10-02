import { getHubAccordionData, getHubPlatformSectionData, getHubHeroData, getCTAData, getFooterData } from '@/lib/agility';
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import AccordionSlider from '@/components/AccordionSlider';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import type { Slide } from '@/components/AccordionSlider';

export default async function Home() {
  let accordionData = null;
  let platformData = null;
  let heroData = null;
  let ctaData = null;
  let footerData = null;
  let error = null;

  try {
    [accordionData, platformData, heroData, ctaData, footerData] = await Promise.all([
      getHubAccordionData(true),
      getHubPlatformSectionData(true),
      getHubHeroData(true),
      getCTAData(true),
      getFooterData(true)
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load content';
  }

  const slides: Slide[] = accordionData?.slides?.map((slide: any) => ({
    id: slide.contentID.toString(),
    image: {
      url: slide.fields.slideImage.url,
      alt: slide.fields.slideImage.label
    },
    titleTop: slide.fields.titleTopLine,
    titleBottom: slide.fields.titleBottomLine,
    metaTop: slide.fields.metaTopLine,
    metaBottom: slide.fields.metaBottomLine
  })) || [];

  return (
    <>
      <Hero 
        herologo={heroData?.herologo}
        mainHeading={heroData?.mainHeading}
        subHeading={heroData?.subHeading}
      />
      <IntroSection 
        torontoSkylineImage={platformData?.torontoSkylineImage}
        platformHeading={platformData?.platformHeading}
        destinationHeading={platformData?.destinationHeading}
        description={platformData?.description}
      />
      
      <section id="accordion-section">
        {error ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#000' }}>
            <p>Error loading content: {error}</p>
            <p>Using preview data from Agility CMS...</p>
          </div>
        ) : slides.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#000' }}>
            <p>Loading slides from Agility CMS...</p>
          </div>
        ) : (
          <AccordionSlider slides={slides} title={accordionData?.title} />
        )}
      </section>

      <ContactSection 
        mainHeading={ctaData?.mainHeading}
        subHeading={ctaData?.subHeading}
        contactName={ctaData?.contactName}
        companyName={ctaData?.companyName}
        email={ctaData?.email}
        phone={ctaData?.phone}
        buttonText={ctaData?.buttonText}
        buttonLink={ctaData?.buttonLink}
        ctaLogo={ctaData?.ctaLogo}
      />
      
      <Footer 
        footerLogo={footerData?.footerLogo}
        privacyText={footerData?.privacyText}
        privacyUrl={footerData?.privacyUrl}
        termsText={footerData?.termsText}
        termsUrl={footerData?.termsUrl}
        cookiesText={footerData?.cookiesText}
        cookiesUrl={footerData?.cookiesUrl}
      />
    </>
  );
}