import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "MSD - Engenharia de Crescimento Digital | Estruture e Escale Seu Negócio",
  description = "Transformamos pequenas e médias empresas em máquinas de crescimento através do Método M.D.S: Marketing + Tecnologia + Estrutura. Diagnóstico estratégico gratuito em 24h.",
  keywords = "engenharia de crescimento digital, marketing digital, automação, e-commerce, crescimento empresarial, consultoria digital, método mds, estruturação digital",
  author = "MSD - Mark's Sucesso Digital",
  image = "https://customer-assets.emergentagent.com/job_maquina-crescimento/artifacts/3xgfi5o4_image.png",
  url = "https://maquina-crescimento.preview.emergentagent.com",
  type = "website"
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        "name": "MSD - Mark's Sucesso Digital",
        "alternateName": "Máquina Digital Estruturada",
        "url": url,
        "logo": {
          "@type": "ImageObject",
          "url": image,
          "width": 512,
          "height": 512
        },
        "description": description,
        "foundingDate": "2025",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Sales",
          "availableLanguage": "Portuguese"
        },
        "sameAs": [
          "https://instagram.com/msd",
          "https://linkedin.com/company/msd",
          "https://facebook.com/msd"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": "MSD - Engenharia de Crescimento Digital",
        "description": description,
        "publisher": {
          "@id": `${url}/#organization`
        },
        "inLanguage": "pt-BR"
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        "url": url,
        "name": title,
        "isPartOf": {
          "@id": `${url}/#website`
        },
        "about": {
          "@id": `${url}/#organization`
        },
        "description": description,
        "inLanguage": "pt-BR"
      },
      {
        "@type": "Service",
        "name": "Método M.D.S - Máquina Digital Estruturada",
        "description": "Sistema de organização, estruturação e escalabilidade digital que transforma empresas desorganizadas no digital em operações previsíveis de vendas.",
        "provider": {
          "@id": `${url}/#organization`
        },
        "areaServed": "BR",
        "serviceType": "Digital Marketing Consulting",
        "offers": {
          "@type": "Offer",
          "name": "Diagnóstico Estratégico Gratuito",
          "price": "0",
          "priceCurrency": "BRL"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <meta name="revisit-after" content="7 days" />

        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="MSD - Mark's Sucesso Digital" />
        <meta property="og:locale" content="pt_BR" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />

        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        <link rel="canonical" href={url} />
      </Helmet>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
    </>
  );
};

export default SEO;
