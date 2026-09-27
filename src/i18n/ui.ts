import type { Locale } from '../config/site';

/**
 * i18n dictionary. Every visible string on the site comes from here —
 * nav, sections, form labels/errors, dialogs, footer, aria-labels, alt text.
 */
export const ui = {
  en: {
    meta: {
      title: 'Northline Atelier — Architecture & Interiors',
      description:
        'Northline Atelier is an architecture and interiors studio creating timeless spaces that balance beauty, purpose, and place.',
    },
    header: {
      menu: 'Menu',
      close: 'Close',
      search: 'Search',
      switchTo: 'Switch to French',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Spaces. Crafted with intention.',
      titleLines: ['Architecture', 'that elevates', 'life.'],
      accentIndex: 2,
      lead: 'Northline Atelier is an architecture and interiors studio creating timeless spaces that balance beauty, purpose, and place.',
      cta: 'Explore our work',
      alt: 'Minimal concrete courtyard house at dusk — olive tree in a stone planter, black-framed glass sliding doors, warm light',
    },
    projects: {
      eyebrow: 'Featured projects',
      viewAll: 'View all projects',
      category: { residential: 'Residential', hospitality: 'Hospitality', commercial: 'Commercial' },
      altPrefix: '',
    },
    studio: {
      eyebrow: 'Our studio',
      title: ['We design with clarity.', 'We build with care.'],
      lead: 'Every project begins with listening – understanding how people live, work, and connect to their surroundings. Our process is collaborative, considered, and guided by craft, context, and enduring design.',
      cta: 'Learn more about our studio',
      alt: 'Studio interior — dark timber dining table, sculptural pendant lamp, floor-to-ceiling glass, plaster wall with framed artwork',
    },
    stats: {
      items: [
        { value: 145, suffix: '+', label: 'Projects delivered' },
        { value: 21, suffix: '', label: 'Years of practice' },
        { value: 36, suffix: '', label: 'Design honors' },
        { value: 14, suffix: '', label: 'Countries served' },
      ],
    },
    services: {
      eyebrow: 'Our services',
      learnMore: 'Learn more',
      items: [
        {
          slug: 'architecture',
          title: 'Architecture',
          desc: 'Timeless architecture shaped by context, purpose, and detail. Designs that endure and inspire.',
        },
        {
          slug: 'interior-design',
          title: 'Interior design',
          desc: 'Thoughtful interiors that balance proportion, light, and materiality to elevate everyday living.',
        },
        {
          slug: 'planning',
          title: 'Planning',
          desc: 'Strategic planning and feasibility studies that lay the foundation for successful projects.',
        },
        {
          slug: 'bespoke-furnishings',
          title: 'Bespoke furnishings',
          desc: 'Custom furniture and millwork crafted with precision to complete your vision.',
        },
      ],
    },
    contact: {
      title: ["Let's build", 'something', 'exceptional.'],
      lead: 'Tell us about your project and our team will be in touch',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@example.com',
        type: 'Project type',
        typeOptions: ['Residential', 'Hospitality', 'Commercial', 'Interiors only', 'Other'],
        message: 'Tell us about your project',
        messagePlaceholder: 'Location, scope, timeline…',
        submit: 'Send inquiry',
        sending: 'Sending…',
        success: 'Thank you — your inquiry was sent. Our team will be in touch shortly.',
        error: 'Something went wrong. Please try again, or email us directly.',
        noEndpoint: 'Form endpoint is not configured yet — opening your email app instead.',
        validation: {
          name: 'Please enter your name.',
          email: 'Please enter a valid email address.',
          message: 'Please tell us a little about your project.',
        },
        honeypot: 'Leave this field empty',
      },
      address: { line1: '28 King Street, Studio 502', line2: 'Copenhagen, Denmark 1264' },
      socialsLabel: 'Follow us',
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    menu: {
      sections: 'Sections',
      contact: 'Contact',
      follow: 'Follow',
    },
    search: {
      placeholder: 'Search projects, studio, services…',
      label: 'Search the site',
      noResults: 'No results found.',
      hint: 'Type to filter projects and sections',
      results: 'results',
      sectionLinks: [
        { title: 'Studio', href: '#studio' },
        { title: 'Services', href: '#services' },
        { title: 'Contact', href: '#contact' },
      ],
    },
    notFound: {
      title: 'Page not found',
      lead: 'The page you are looking for does not exist or has moved.',
      back: 'Back to home',
    },
  },

  fr: {
    meta: {
      title: 'Northline Atelier — Architecture & Intérieurs',
      description:
        "Northline Atelier est un studio d'architecture et d'intérieurs qui crée des espaces intemporels où beauté, fonction et lieu s'équilibrent.",
    },
    header: {
      menu: 'Menu',
      close: 'Fermer',
      search: 'Rechercher',
      switchTo: "Passer à l'anglais",
      language: 'Langue',
    },
    hero: {
      eyebrow: 'Des espaces. Pensés avec intention.',
      titleLines: ['Une architecture', 'qui élève', 'la vie.'],
      accentIndex: 2,
      lead: "Northline Atelier est un studio d'architecture et d'intérieurs qui crée des espaces intemporels, où beauté, fonction et lieu s'équilibrent.",
      cta: 'Découvrir nos réalisations',
      alt: "Maison-patio minimaliste en béton au crépuscule — olivier dans un bac en pierre, baies vitrées coulissantes à cadre noir, lumière chaude",
    },
    projects: {
      eyebrow: 'Projets à l’affiche',
      viewAll: 'Voir tous les projets',
      category: { residential: 'Résidentiel', hospitality: 'Hôtellerie', commercial: 'Commercial' },
      altPrefix: '',
    },
    studio: {
      eyebrow: 'Notre studio',
      title: ['Nous concevons avec clarté.', 'Nous construisons avec soin.'],
      lead: 'Chaque projet commence par l’écoute — comprendre comment les gens vivent, travaillent et se relient à leur environnement. Notre démarche est collaborative, réfléchie, guidée par le savoir-faire, le contexte et un design durable.',
      cta: 'Découvrir notre studio',
      alt: "Intérieur du studio — table à manger en bois sombre, suspension sculpturale, baies vitrées du sol au plafond, mur en plâtre avec œuvre encadrée",
    },
    stats: {
      items: [
        { value: 145, suffix: '+', label: 'Projets réalisés' },
        { value: 21, suffix: '', label: 'Années de pratique' },
        { value: 36, suffix: '', label: 'Distinctions' },
        { value: 14, suffix: '', label: 'Pays desservis' },
      ],
    },
    services: {
      eyebrow: 'Nos services',
      learnMore: 'En savoir plus',
      items: [
        {
          slug: 'architecture',
          title: 'Architecture',
          desc: 'Une architecture intemporelle façonnée par le contexte, l’usage et le détail. Des réalisations qui traversent le temps et inspirent.',
        },
        {
          slug: 'interior-design',
          title: 'Design d’intérieur',
          desc: 'Des intérieurs pensés qui équilibrent proportion, lumière et matériaux pour sublimer le quotidien.',
        },
        {
          slug: 'planning',
          title: 'Planification',
          desc: 'Études stratégiques de planification et de faisabilité qui fondent la réussite des projets.',
        },
        {
          slug: 'bespoke-furnishings',
          title: 'Mobilier sur mesure',
          desc: 'Meubles et agencements sur mesure, exécutés avec précision pour parfaire votre vision.',
        },
      ],
    },
    contact: {
      title: ['Créons', 'quelque chose', "d'exceptionnel."],
      lead: 'Parlez-nous de votre projet et notre équipe vous recontactera',
      form: {
        name: 'Nom',
        namePlaceholder: 'Votre nom',
        email: 'E-mail',
        emailPlaceholder: 'vous@exemple.com',
        type: 'Type de projet',
        typeOptions: ['Résidentiel', 'Hôtellerie', 'Commercial', 'Intérieurs uniquement', 'Autre'],
        message: 'Parlez-nous de votre projet',
        messagePlaceholder: 'Lieu, étendue, calendrier…',
        submit: 'Envoyer la demande',
        sending: 'Envoi…',
        success: 'Merci — votre demande a bien été envoyée. Notre équipe vous recontactera très vite.',
        error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
        noEndpoint: 'Le formulaire n’est pas encore configuré — ouverture de votre messagerie.',
        validation: {
          name: 'Veuillez indiquer votre nom.',
          email: 'Veuillez saisir une adresse e-mail valide.',
          message: 'Dites-nous quelques mots sur votre projet.',
        },
        honeypot: 'Laissez ce champ vide',
      },
      address: { line1: '28 King Street, Studio 502', line2: 'Copenhague, Danemark 1264' },
      socialsLabel: 'Suivez-nous',
    },
    footer: {
      rights: 'Tous droits réservés.',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },
    menu: {
      sections: 'Rubriques',
      contact: 'Contact',
      follow: 'Suivre',
    },
    search: {
      placeholder: 'Rechercher projets, studio, services…',
      label: 'Rechercher sur le site',
      noResults: 'Aucun résultat.',
      hint: 'Tapez pour filtrer les projets et les rubriques',
      results: 'résultats',
      sectionLinks: [
        { title: 'Studio', href: '#studio' },
        { title: 'Services', href: '#services' },
        { title: 'Contact', href: '#contact' },
      ],
    },
    notFound: {
      title: 'Page introuvable',
      lead: "La page que vous cherchez n'existe pas ou a été déplacée.",
      back: "Retour à l'accueil",
    },
  },
} as const;

export type UIStrings = (typeof ui)['en'];

export function useTranslations(locale: Locale): UIStrings {
  // `as` keeps a single shape: FR dictionary mirrors EN structure.
  return (ui[locale] ?? ui.en) as unknown as UIStrings;
}
