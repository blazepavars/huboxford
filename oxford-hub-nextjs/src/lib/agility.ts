
const AGILITY_GUID = process.env.AGILITY_GUID || 'd26acb91-u';
const AGILITY_API_PREVIEW_KEY = process.env.AGILITY_API_PREVIEW_KEY;
const AGILITY_API_FETCH_KEY = process.env.AGILITY_API_FETCH_KEY;
const AGILITY_API_URL = `https://api.aglty.io/${AGILITY_GUID}`;

export interface HubSlide {
  contentID: number;
  fields: {
    slideImage: {
      url: string;
      label: string;
      width: number;
      height: number;
    };
    titleTopLine: string;
    titleBottomLine: string;
    metaTopLine: string;
    metaBottomLine: string;
  };
}

export interface HubAccordionData {
  title: string;
  slides: HubSlide[];
}

export interface HubPlatformSectionData {
  torontoSkylineImage?: {
    url: string;
    label: string;
  };
  platformHeading?: string;
  destinationHeading?: string;
  description?: string;
}

export interface HubHeroData {
  herologo?: {
    url: string;
    label: string;
  };
  mainHeading?: string;
  subHeading?: string;
  heroVideo?: {
    url: string;
    label?: string;
  };
}

export interface CTAData {
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

export interface FooterData {
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

export async function getHubSlides(preview = true): Promise<HubSlide[]> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  const response = await fetch(
    `${AGILITY_API_URL}/${apiType}/en-us/list/hubslides`,
    {
      headers: {
        'APIKey': apiKey,
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch slides: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}

export async function getHomepageData(preview = true): Promise<any> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  const response = await fetch(
    `${AGILITY_API_URL}/${apiType}/en-us/sync/pages`,
    {
      headers: {
        'APIKey': apiKey,
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch pages: ${response.statusText}`);
  }

  const data = await response.json();
  const homepage = data.items?.find((page: any) => 
    page.templateName === 'Hub Landing Page' ||
    page.templateName === 'HubLandingPage' ||
    (page.name && page.name.toLowerCase() === 'homepage')
  );

  return homepage;
}

export async function getHubAccordionData(preview = true): Promise<HubAccordionData> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  try {
    const response = await fetch(
      `${AGILITY_API_URL}/${apiType}/en-us/page/932`,
      {
        headers: {
          'APIKey': apiKey,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.statusText}`);
    }

    const data = await response.json();
    const mainContentZone = data.zones?.['main-content'];
    if (mainContentZone) {
      const hubAccordionComponent = mainContentZone.find((component: any) => 
        component.module === 'HubAccordion'
      );
      
      if (hubAccordionComponent?.item?.fields) {
        const slides = await getHubSlides(preview);
        
        return {
          title: hubAccordionComponent.item.fields.title || 'THE HUB FOR OPPORTUNITY',
          slides: slides
        };
      }
    }
    const slides = await getHubSlides(preview);
    return {
      title: 'THE HUB FOR OPPORTUNITY',
      slides: slides
    };
  } catch (error) {
    throw error;
  }
}

export async function getHubHeroData(preview = true): Promise<HubHeroData> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  try {
    const response = await fetch(
      `${AGILITY_API_URL}/${apiType}/en-us/page/932`,
      {
        headers: {
          'APIKey': apiKey,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.statusText}`);
    }

    const data = await response.json();
    const mainContentZone = data.zones?.['main-content'];
    if (mainContentZone) {
      const hubHeroComponent = mainContentZone.find((component: any) => 
        component.module === 'HubHeroSection'
      );
      
      if (hubHeroComponent?.item?.fields) {
        return {
          herologo: hubHeroComponent.item.fields.herologo,
          mainHeading: hubHeroComponent.item.fields.mainHeading,
          subHeading: hubHeroComponent.item.fields.subHeading,
          heroVideo: hubHeroComponent.item.fields.heroVideo
        };
      }
    }
    return {};
  } catch (error) {
    return {};
  }
}

export async function getCTAData(preview = true): Promise<CTAData> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  try {
    const response = await fetch(
      `${AGILITY_API_URL}/${apiType}/en-us/page/932`,
      {
        headers: {
          'APIKey': apiKey,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.statusText}`);
    }

    const data = await response.json();
    const mainContentZone = data.zones?.['main-content'];
    if (mainContentZone) {
      const ctaComponent = mainContentZone.find((component: any) => 
        component.module === 'HubCTA'
      );
      
      if (ctaComponent?.item?.fields) {
        return {
          mainHeading: ctaComponent.item.fields.mainHeading,
          subHeading: ctaComponent.item.fields.subHeading,
          contactName: ctaComponent.item.fields.contactName,
          companyName: ctaComponent.item.fields.companyName,
          email: ctaComponent.item.fields.email,
          phone: ctaComponent.item.fields.phone,
          buttonText: ctaComponent.item.fields.buttonText,
          buttonLink: ctaComponent.item.fields.buttonLink,
          ctaLogo: ctaComponent.item.fields.cTASectionLogo
        };
      }
    }
    return {};
  } catch (error) {
    return {};
  }
}

export async function getFooterData(preview = true): Promise<FooterData> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  try {
    const response = await fetch(
      `${AGILITY_API_URL}/${apiType}/en-us/page/932`,
      {
        headers: {
          'APIKey': apiKey,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.statusText}`);
    }

    const data = await response.json();
    const mainContentZone = data.zones?.['main-content'];
    if (mainContentZone) {
      const footerComponent = mainContentZone.find((component: any) => 
        component.module === 'HubFooter'
      );
      
      if (footerComponent?.item?.fields) {
        return {
          footerLogo: footerComponent.item.fields.footerLogo,
          privacyText: footerComponent.item.fields.privacyLinkText,
          privacyUrl: footerComponent.item.fields.privacyLinkURL,
          termsText: footerComponent.item.fields.termsLinkText,
          termsUrl: footerComponent.item.fields.termsLinkURL,
          cookiesText: footerComponent.item.fields.cookiesLinkText,
          cookiesUrl: footerComponent.item.fields.cookiesLinkURL
        };
      }
    }
    return {};
  } catch (error) {
    return {};
  }
}

export async function getHubPlatformSectionData(preview = true): Promise<HubPlatformSectionData> {
  const apiKey = preview ? AGILITY_API_PREVIEW_KEY : AGILITY_API_FETCH_KEY;
  const apiType = preview ? 'preview' : 'fetch';
  
  if (!apiKey) {
    throw new Error(`Missing ${preview ? 'preview' : 'fetch'} API key`);
  }

  try {
    const response = await fetch(
      `${AGILITY_API_URL}/${apiType}/en-us/page/932`,
      {
        headers: {
          'APIKey': apiKey,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.statusText}`);
    }

    const data = await response.json();
    const mainContentZone = data.zones?.['main-content'];
    if (mainContentZone) {
      const hubPlatformComponent = mainContentZone.find((component: any) => 
        component.module === 'HubPlatformSection'
      );
      
      if (hubPlatformComponent?.item?.fields) {
        return {
          torontoSkylineImage: hubPlatformComponent.item.fields.torontoSkylineImage,
          platformHeading: hubPlatformComponent.item.fields.platformHeading,
          destinationHeading: hubPlatformComponent.item.fields.destinationHeading,
          description: hubPlatformComponent.item.fields.description
        };
      }
    }
    return {};
  } catch (error) {
    return {};
  }
}