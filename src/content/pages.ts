import type { Language, PageId } from '../routes'

/**
 * Text for the pages beyond the home page, one entry per language.
 *
 * Titles, descriptions and h1s follow the keyword research in the SEO
 * audit: the main search term of each page goes into `title` and `h1`.
 * A section without paragraphs or items is a gap still to be written —
 * `yarn dev` marks it, and the page stays a draft (see PAGES in
 * src/routes.ts) until the gaps are filled.
 */
export interface PageContent {
  /** <title> — about 60 characters, main search term first */
  title: string
  /** meta description — about 150 characters */
  description: string
  h1: string
  lead: string
  sections: ContentSection[]
}

export interface ContentSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
  link?: { label: string; href: string }
}

export type ContentPageId = Exclude<PageId, 'home' | 'videos' | 'imprint' | 'privacy'>

const WORKS = [
  'A Midsummer Night’s Dream — Tanzoffensive Berlin',
  'Grüne Träume, graue Zukunft — Junges Theater Hof',
  'Ellis in the Wonder World Water — North German Performing Arts Youth Company, Flensburg',
  'Spelunkenwirt — North German Performing Arts Youth Company, Flensburg',
  'The Beauty of Oxum — Landestheater Detmold',
]

const TRIAL_CLASS = 'https://www.tanzoffensive.com/probetraining'

export const CONTENT: Record<ContentPageId, Record<Language, PageContent>> = {
  ballet: {
    en: {
      title: 'Ballet Classes in Berlin — Denison Silva',
      description:
        'Classical and neoclassical ballet classes in Berlin for children, teens and adults, beginners included. Taught in English, German, Portuguese or Spanish.',
      h1: 'Ballet classes in Berlin with Denison Silva',
      lead: 'Classical and neoclassical ballet for children, teens and adults — taught in four languages.',
      sections: [
        { heading: 'Ballet for adults and beginners' },
        { heading: 'Children’s and teen ballet' },
        { heading: 'Open class and trial class' },
        { heading: 'Frequently asked questions' },
      ],
    },
    de: {
      title: 'Ballettunterricht Berlin — Denison Silva',
      description:
        'Ballettunterricht in Berlin für Kinder, Jugendliche und Erwachsene, auch für Anfänger. Klassisches und neoklassisches Ballett in vier Sprachen.',
      h1: 'Ballettunterricht in Berlin bei Denison Silva',
      lead: 'Klassisches und neoklassisches Ballett für Kinder, Jugendliche und Erwachsene – auf Deutsch, Englisch, Portugiesisch oder Spanisch.',
      sections: [
        { heading: 'Ballett für Erwachsene und Anfänger' },
        { heading: 'Kinderballett und Ballett für Jugendliche' },
        { heading: 'Offene Klasse und Probetraining' },
        { heading: 'Häufige Fragen' },
      ],
    },
    pt: {
      title: 'Aulas de balé em Berlim — Denison Silva',
      description:
        'Aulas de balé clássico e neoclássico em Berlim para crianças, adolescentes e adultos, também iniciantes. Em português, alemão, inglês ou espanhol.',
      h1: 'Aulas de balé em Berlim com Denison Silva',
      lead: 'Balé clássico e neoclássico para crianças, adolescentes e adultos — em português, alemão, inglês ou espanhol.',
      sections: [
        { heading: 'Balé para adultos e iniciantes' },
        { heading: 'Balé infantil e para adolescentes' },
        { heading: 'Aula aberta e aula experimental' },
        { heading: 'Perguntas frequentes' },
      ],
    },
  },

  // Schedule as published on tanzoffensive.com (checked 5 November 2026).
  contemporary: {
    en: {
      title: 'Contemporary Dance Classes in Berlin — Denison Silva',
      description:
        'Contemporary dance in Berlin-Wartenberg with Denison Silva: open classes, one of them for children from 8, and a pre-professional class for ages 11 to 15.',
      h1: 'Contemporary dance classes in Berlin',
      lead: 'Contemporary dance with Denison Silva at the Tanzoffensive Berlin studio in Wartenberg: two open classes and one pre-professional class.',
      sections: [
        {
          heading: 'Classes and times',
          items: [
            'Friday, 7:00–8:15 pm: pre-professional class, ages 11–15',
            'Saturday, 11:00 am–12:30 pm: open class',
            'Saturday, 1:45–2:45 pm: open class from age 8',
          ],
          paragraphs: ['The classes have been running since 26 September 2026.'],
        },
        {
          heading: 'Location',
          paragraphs: ['Tanzoffensive Berlin, Wartenberg studio, Dorfstraße 15, Berlin.'],
        },
        {
          heading: 'Trial class',
          paragraphs: ['Book a trial class directly with the Tanzoffensive.'],
          link: { label: 'Request a trial class', href: TRIAL_CLASS },
        },
      ],
    },
    de: {
      title: 'Contemporary Dance Berlin — Kurse bei Denison Silva',
      description:
        'Contemporary Dance in Berlin-Wartenberg bei Denison Silva: offene Klassen, eine davon für Kinder ab 8 Jahren, und eine Leistungsklasse für 11- bis 15-Jährige.',
      h1: 'Contemporary Dance in Berlin',
      lead: 'Zeitgenössischer Tanz bei Denison Silva im Studio der Tanzoffensive Berlin in Wartenberg: zwei offene Klassen und eine Leistungsklasse.',
      sections: [
        {
          heading: 'Klassen und Zeiten',
          items: [
            'Freitag, 19:00–20:15 Uhr: Leistungsklasse, 11–15 Jahre',
            'Samstag, 11:00–12:30 Uhr: offene Klasse',
            'Samstag, 13:45–14:45 Uhr: offene Klasse ab 8 Jahren',
          ],
          paragraphs: ['Die Klassen laufen seit dem 26. September 2026.'],
        },
        {
          heading: 'Ort',
          paragraphs: ['Tanzoffensive Berlin, Studio Wartenberg, Dorfstraße 15, Berlin.'],
        },
        {
          heading: 'Probetraining',
          paragraphs: ['Ein Probetraining können Sie direkt bei der Tanzoffensive anfragen.'],
          link: { label: 'Probetraining anfragen', href: TRIAL_CLASS },
        },
      ],
    },
    pt: {
      title: 'Aulas de dança contemporânea em Berlim — Denison Silva',
      description:
        'Dança contemporânea em Berlim-Wartenberg com Denison Silva: turmas abertas, uma delas para crianças a partir de 8 anos, e uma turma avançada de 11 a 15 anos.',
      h1: 'Aulas de dança contemporânea em Berlim',
      lead: 'Dança contemporânea com Denison Silva no estúdio da Tanzoffensive Berlin em Wartenberg: duas turmas abertas e uma turma avançada.',
      sections: [
        {
          heading: 'Turmas e horários',
          items: [
            'Sexta-feira, 19h00–20h15: turma avançada, 11 a 15 anos',
            'Sábado, 11h00–12h30: turma aberta',
            'Sábado, 13h45–14h45: turma aberta a partir de 8 anos',
          ],
          paragraphs: ['As turmas acontecem desde 26 de setembro de 2026.'],
        },
        {
          heading: 'Local',
          paragraphs: ['Tanzoffensive Berlin, estúdio Wartenberg, Dorfstraße 15, Berlim.'],
        },
        {
          heading: 'Aula experimental',
          paragraphs: ['A aula experimental é agendada diretamente com a Tanzoffensive.'],
          link: { label: 'Agendar aula experimental', href: TRIAL_CLASS },
        },
      ],
    },
  },

  jazz: {
    en: {
      title: 'Jazz Dance Classes in Berlin — Denison Silva',
      description:
        'Jazz dance and lyrical jazz in Berlin with Denison Silva, ballet dancer and choreographer, for children, teens and adults.',
      h1: 'Jazz dance and lyrical jazz in Berlin',
      lead: 'Jazz dance and jazz-lyrical with Denison Silva — for children, teens and adults.',
      sections: [
        { heading: 'What is lyrical jazz?' },
        { heading: 'Who the classes are for' },
        { heading: 'Location, times and trial class' },
      ],
    },
    de: {
      title: 'Jazz Dance Berlin — Lyrical Jazz bei Denison Silva',
      description:
        'Jazz Dance und Lyrical Jazz in Berlin bei Denison Silva, Balletttänzer und Choreograf – für Kinder, Jugendliche und Erwachsene.',
      h1: 'Jazz Dance und Lyrical Jazz in Berlin',
      lead: 'Jazz Dance und Jazz-Lyrical bei Denison Silva – für Kinder, Jugendliche und Erwachsene.',
      sections: [
        { heading: 'Was ist Lyrical Jazz?' },
        { heading: 'Für wen' },
        { heading: 'Ort, Zeiten und Probetraining' },
      ],
    },
    pt: {
      title: 'Aulas de jazz em Berlim — Denison Silva',
      description:
        'Jazz dance e jazz lírico em Berlim com Denison Silva, bailarino e coreógrafo, para crianças, adolescentes e adultos.',
      h1: 'Jazz dance e jazz lírico em Berlim',
      lead: 'Jazz dance e jazz lírico com Denison Silva — para crianças, adolescentes e adultos.',
      sections: [
        { heading: 'O que é jazz lírico?' },
        { heading: 'Para quem' },
        { heading: 'Local, horários e aula experimental' },
      ],
    },
  },

  private: {
    en: {
      title: 'Private Ballet Lessons in Berlin — Denison Silva',
      description:
        'Private ballet lessons and coaching in Berlin: for beginners, returners and dancers preparing an audition. In English, German, Portuguese or Spanish.',
      h1: 'Private ballet lessons and coaching in Berlin',
      lead: 'One-to-one lessons for beginners, returners and dancers preparing for an audition — in four languages.',
      sections: [
        { heading: 'Who it is for' },
        { heading: 'How a lesson works' },
        { heading: 'Audition preparation' },
        { heading: 'Get in touch' },
      ],
    },
    de: {
      title: 'Ballett Privatstunden Berlin — Denison Silva',
      description:
        'Ballett-Privatstunden und Coaching in Berlin: für Einsteiger, Wiedereinsteiger und zur Vorbereitung aufs Vortanzen. Auf Deutsch, Englisch, Portugiesisch oder Spanisch.',
      h1: 'Ballett-Privatstunden und Coaching in Berlin',
      lead: 'Einzelunterricht für Einsteiger, Wiedereinsteiger und Tänzerinnen und Tänzer vor dem Vortanzen – in vier Sprachen.',
      sections: [
        { heading: 'Für wen' },
        { heading: 'Ablauf' },
        { heading: 'Vortanzen vorbereiten' },
        { heading: 'Anfrage' },
      ],
    },
    pt: {
      title: 'Aulas particulares de balé em Berlim — Denison Silva',
      description:
        'Aulas particulares de balé e coaching em Berlim: para iniciantes, para quem volta a dançar e para preparar audições. Em português, alemão, inglês ou espanhol.',
      h1: 'Aulas particulares de balé e coaching em Berlim',
      lead: 'Aulas individuais para iniciantes, para quem volta a dançar e para bailarinos que se preparam para uma audição — em quatro línguas.',
      sections: [
        { heading: 'Para quem' },
        { heading: 'Como funciona' },
        { heading: 'Preparação para audições' },
        { heading: 'Contato' },
      ],
    },
  },

  workshops: {
    en: {
      title: 'Dance Workshops for Schools and Kindergartens — Denison Silva',
      description:
        'Inclusive dance workshops and dance projects for schools and kindergartens in Berlin, by a dance educator with workshops for more than 600 children.',
      h1: 'Dance workshops for schools and kindergartens',
      lead: 'Inclusive dance workshops and projects — built on workshops with more than 600 children in schools and daycare centres.',
      sections: [
        { heading: 'Formats' },
        { heading: 'Process and duration' },
        { heading: 'Get in touch' },
      ],
    },
    de: {
      title: 'Tanzworkshops für Schulen und Kitas — Denison Silva',
      description:
        'Inklusive Tanzworkshops und Tanzprojekte für Schulen und Kitas in Berlin – vom Tanzpädagogen Denison Silva, mit Erfahrung aus Workshops mit über 600 Kindern.',
      h1: 'Tanzworkshops für Schulen und Kitas',
      lead: 'Inklusive Tanzworkshops und Tanzprojekte – mit Erfahrung aus Workshops mit über 600 Kindern in Schulen und Kitas.',
      sections: [{ heading: 'Formate' }, { heading: 'Ablauf und Dauer' }, { heading: 'Anfrage' }],
    },
    pt: {
      title: 'Oficinas de dança para escolas — Denison Silva',
      description:
        'Oficinas de dança inclusivas e projetos de dança para escolas e creches em Berlim, com a experiência de oficinas para mais de 600 crianças.',
      h1: 'Oficinas de dança para escolas e creches',
      lead: 'Oficinas e projetos de dança inclusivos — com a experiência de oficinas para mais de 600 crianças em escolas e creches.',
      sections: [{ heading: 'Formatos' }, { heading: 'Etapas e duração' }, { heading: 'Contato' }],
    },
  },

  choreography: {
    en: {
      title: 'Choreographer in Berlin — Denison Silva',
      description:
        'Denison Silva, ballet and contemporary choreographer in Berlin: full-length productions for youth companies, commissioned pieces and guest choreography.',
      h1: 'Choreography',
      lead: 'Full-length productions for youth companies, commissioned pieces and guest choreography — from the first idea to opening night: repertoire, music, lighting and costume.',
      sections: [
        { heading: 'Works', items: WORKS },
        {
          heading: 'For companies, schools and theatres',
          paragraphs: [
            'Denison Silva creates evening-length productions, commissioned pieces and guest choreography for youth companies, dance schools and theatres.',
          ],
          link: { label: 'Write to Denison', href: '/#contact' },
        },
      ],
    },
    de: {
      title: 'Choreograf in Berlin — Denison Silva',
      description:
        'Denison Silva, Choreograf für Ballett und Contemporary in Berlin: abendfüllende Produktionen für Jugendkompanien, Auftragswerke und Gastchoreografien.',
      h1: 'Choreografie',
      lead: 'Abendfüllende Produktionen für Jugendkompanien, Auftragswerke und Gastchoreografien – von der ersten Idee bis zur Premiere: Repertoire, Musik, Licht und Kostüm.',
      sections: [
        { heading: 'Werke', items: WORKS },
        {
          heading: 'Für Kompanien, Schulen und Theater',
          paragraphs: [
            'Denison Silva entwickelt abendfüllende Produktionen, Auftragswerke und Gastchoreografien für Jugendkompanien, Tanzschulen und Theater.',
          ],
          link: { label: 'Denison schreiben', href: '/de/#contact' },
        },
      ],
    },
    pt: {
      title: 'Coreógrafo em Berlim — Denison Silva',
      description:
        'Denison Silva, coreógrafo de balé e dança contemporânea em Berlim: espetáculos para companhias jovens, obras sob encomenda e coreografias como convidado.',
      h1: 'Coreografia',
      lead: 'Espetáculos completos para companhias jovens, obras sob encomenda e coreografias como convidado — da primeira ideia à estreia: repertório, música, luz e figurino.',
      sections: [
        { heading: 'Obras', items: WORKS },
        {
          heading: 'Para companhias, escolas e teatros',
          paragraphs: [
            'Denison Silva cria espetáculos completos, obras sob encomenda e coreografias como convidado para companhias jovens, escolas de dança e teatros.',
          ],
          link: { label: 'Escrever para Denison', href: '/pt/#contact' },
        },
      ],
    },
  },

  // The body of this page is the existing About, CV and References
  // sections; they move here from the home page once it is slimmed down.
  dancer: {
    en: {
      title: 'Ballet Dancer — Denison Silva',
      description:
        'Denison Silva, ballet dancer: fifteen years on stage with Ballet Nacional del Sodre, Ballet Nacional de Argentina, Ballets de France and five German theatres.',
      h1: 'Denison Silva — ballet dancer',
      lead: 'Fifteen years on stage, from Montevideo and Buenos Aires to France and five German theatres.',
      sections: [],
    },
    de: {
      title: 'Balletttänzer — Denison Silva',
      description:
        'Denison Silva, Balletttänzer: fünfzehn Jahre auf der Bühne, u. a. beim Ballet Nacional del Sodre, Ballet Nacional de Argentina und an fünf deutschen Theatern.',
      h1: 'Denison Silva — Balletttänzer',
      lead: 'Fünfzehn Jahre auf der Bühne – von Montevideo und Buenos Aires über Frankreich bis an fünf deutsche Theater.',
      sections: [],
    },
    pt: {
      title: 'Bailarino — Denison Silva',
      description:
        'Denison Silva, bailarino brasileiro: quinze anos de palco no Ballet Nacional del Sodre, no Ballet Nacional de Argentina, nos Ballets de France e em teatros alemães.',
      h1: 'Denison Silva — bailarino',
      lead: 'Quinze anos de palco — de Montevidéu e Buenos Aires à França e a cinco teatros alemães.',
      sections: [],
    },
  },
}
