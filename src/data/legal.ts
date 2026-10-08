
export const ENTITY = {
  name: 'Denison Pereira da Silva',
  street: 'Kluckstraße 27',
  postalCity: '10785 Berlin',
  country: { de: 'Deutschland', en: 'Germany', pt: 'Alemanha' },
  email: 'contact@denisonsilva.com',
  phone: '+49 172 319 4331',
} as const

function fill(line: string, country: string): string {
  return line
    .replaceAll('{name}', ENTITY.name)
    .replaceAll('{street}', ENTITY.street)
    .replaceAll('{postalCity}', ENTITY.postalCity)
    .replaceAll('{country}', country)
    .replaceAll('{email}', ENTITY.email)
    .replaceAll('{phone}', ENTITY.phone)
}

export interface LegalSection {
  heading: string
  lines: string[]
  layout?: 'prose' | 'stacked'
}

export interface LegalDocument {
  title: string
  sections: LegalSection[]
}

export interface LegalLocale {
  imprint: LegalDocument
  privacy: LegalDocument
}

export type LegalLanguage = 'de' | 'en' | 'pt'

const CONTENT: Record<LegalLanguage, LegalLocale> = {
  de: {
    imprint: {
      title: 'Impressum',
      sections: [
        {
          heading: 'Angaben gemäß § 5 DDG',
          layout: 'stacked',
          lines: ['{name}', '{street}', '{postalCity}', '{country}'],
        },
        {
          heading: 'Kontakt',
          layout: 'stacked',
          lines: ['E-Mail: {email}', 'Telefon: {phone}'],
        },
      ],
    },

    privacy: {
      title: 'Datenschutzerklärung',
      sections: [
        {
          heading: '1. Verantwortlicher',
          layout: 'stacked',
          lines: [
            'Verantwortlich für die Verarbeitung personenbezogener Daten auf denisonsilva.com ist:',
            '{name}',
            '{street}',
            '{postalCity}',
            '{country}',
            'E-Mail: {email}',
          ],
        },
        {
          heading: '2. Hosting und Bereitstellung der Website',
          lines: [
            'Diese Website sowie die E-Mail-Dienste werden bei ALL-INKL.COM – Neue Medien Münnich, Inhaber: René Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland, betrieben.',
            'Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet, insbesondere Ihre IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Inhalte sowie die von Ihrem Browser übermittelten technischen Angaben. Diese Daten können in Serverprotokollen gespeichert werden.',
            'Die Verarbeitung dient der Bereitstellung, Sicherheit und Stabilität der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht im sicheren und zuverlässigen Betrieb der Website.',
            'Technische Zugriffsdaten werden nur so lange gespeichert, wie dies für die Bereitstellung der Website sowie die Erkennung und Aufklärung von Störungen oder Sicherheitsvorfällen erforderlich ist.',
            'Die verwendeten Schriftarten werden auf dem Webserver dieser Website gespeichert. Es werden hierfür keine Verbindungen zu externen Schriftanbietern hergestellt.',
          ],
        },
        {
          heading: '3. Kontaktformular und E-Mail',
          lines: [
            'Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, Ihre Nachricht und die weiteren von Ihnen übermittelten Angaben, um Ihre Anfrage zu beantworten und mögliche Rückfragen zu bearbeiten.',
            'Die Übermittlung und Verarbeitung der Nachrichten erfolgt über die Hosting- und E-Mail-Infrastruktur von ALL-INKL.',
            'Dient Ihre Anfrage dem Abschluss oder der Durchführung eines Vertrags mit Ihnen, beruht die Verarbeitung auf Art. 6 Abs. 1 lit. b DSGVO. Bei sonstigen Anfragen ist Art. 6 Abs. 1 lit. f DSGVO die Rechtsgrundlage. Unser berechtigtes Interesse besteht in der Bearbeitung eingehender Anfragen.',
            'Die Bereitstellung Ihrer Angaben ist freiwillig. Ohne die zur Bearbeitung erforderlichen Informationen und eine Kontaktmöglichkeit können wir Ihre Anfrage gegebenenfalls nicht beantworten.',
            'Anfragen werden gelöscht, sobald ihre Bearbeitung abgeschlossen ist und die Daten nicht mehr für die weitere Kommunikation, Vertragsdurchführung oder die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigt werden. Gesetzliche Aufbewahrungspflichten bleiben unberührt.',
            'Soweit gesetzliche Aufbewahrungspflichten bestehen, erfolgt die Speicherung auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Eine erforderliche Aufbewahrung zur Wahrung von Rechtsansprüchen beruht auf Art. 6 Abs. 1 lit. f DSGVO.',
          ],
        },
        {
          heading: '4. Empfänger',
          lines: [
            'ALL-INKL verarbeitet als Hosting- und E-Mail-Dienstleister die zur Bereitstellung dieser Dienste erforderlichen Daten.',
            'Eine darüber hinausgehende Weitergabe erfolgt nur, soweit sie zur Vertragsdurchführung erforderlich ist, eine gesetzliche Verpflichtung besteht oder Sie eingewilligt haben.',
          ],
        },
        {
          heading: '5. Links zu YouTube',
          lines: [
            'Diese Website enthält externe Links zu YouTube. YouTube-Videos und extern geladene YouTube-Vorschaubilder sind nicht eingebunden.',
            'Erst beim Aufruf eines solchen Links greifen Sie auf YouTube zu. Die dortige Verarbeitung personenbezogener Daten richtet sich nach den Datenschutzbestimmungen des Anbieters: https://policies.google.com/privacy?hl=de',
          ],
        },
        {
          heading: '6. Ihre Rechte',
          lines: [
            'Unter den gesetzlichen Voraussetzungen haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit.',
            'Soweit eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.',
            'Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere im Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des vermuteten Verstoßes.',
            'Zur Ausübung Ihrer Rechte können Sie sich an die oben angegebene Kontaktadresse wenden.',
          ],
        },
        {
          heading: '7. Widerspruchsrecht',
          lines: [
            'Bei einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch einzulegen.',
            'Wir verarbeiten die betroffenen Daten dann nicht weiter, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
          ],
        },
      ],
    },
  },

  en: {
    imprint: {
      title: 'Legal Notice',
      sections: [
        {
          heading: 'Information pursuant to Section 5 DDG',
          layout: 'stacked',
          lines: ['{name}', '{street}', '{postalCity}', '{country}'],
        },
        {
          heading: 'Contact',
          layout: 'stacked',
          lines: ['Email: {email}', 'Telephone: {phone}'],
        },
      ],
    },

    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: '1. Controller',
          layout: 'stacked',
          lines: [
            'The controller responsible for processing personal data on denisonsilva.com is:',
            '{name}',
            '{street}',
            '{postalCity}',
            '{country}',
            'Email: {email}',
          ],
        },
        {
          heading: '2. Hosting and website delivery',
          lines: [
            'This website and its email services are operated using ALL-INKL.COM – Neue Medien Münnich, owner: René Münnich, Hauptstraße 68, 02742 Friedersdorf, Germany.',
            'When you access this website, technically necessary data is processed, including your IP address, the time of access, the requested content and technical information transmitted by your browser. This data may be stored in server logs.',
            'This processing serves to deliver the website and maintain its security and stability. The legal basis is Article 6(1)(f) GDPR. Our legitimate interest is the secure and reliable operation of this website.',
            'Technical access data is retained only for as long as necessary to deliver the website and to detect and investigate technical problems or security incidents.',
            'The fonts used on this website are stored on its web server. No connections to external font providers are established for this purpose.',
          ],
        },
        {
          heading: '3. Contact form and email',
          lines: [
            'If you contact us using the contact form or by email, we process your email address, your message and any other information you provide to respond to your enquiry and handle follow-up questions.',
            'Messages are transmitted and processed using ALL-INKL’s hosting and email infrastructure.',
            'Where your enquiry concerns entering into or performing a contract with you, processing is based on Article 6(1)(b) GDPR. For other enquiries, the legal basis is Article 6(1)(f) GDPR. Our legitimate interest is handling incoming enquiries.',
            'Providing your information is voluntary. However, without the information necessary to address your enquiry and a means of contacting you, we may be unable to respond.',
            'Enquiries are deleted once they have been dealt with and the data is no longer required for further communication, contract performance or the establishment, exercise or defence of legal claims. Statutory retention obligations remain unaffected.',
            'Where statutory retention obligations apply, storage is based on Article 6(1)(c) GDPR. Retention necessary to protect legal claims is based on Article 6(1)(f) GDPR.',
          ],
        },
        {
          heading: '4. Recipients',
          lines: [
            'As the hosting and email service provider, ALL-INKL processes the data necessary to provide these services.',
            'Any further disclosure takes place only where necessary to perform a contract, where legally required or where you have given consent.',
          ],
        },
        {
          heading: '5. Links to YouTube',
          lines: [
            'This website contains external links to YouTube. Thumbnails are being stored locally. When clicking Play, an embedded YouTube video is loaded from YouTube’s servers. This means that YouTube can set cookies and track your behaviour on this website.',
            'You access YouTube only when you follow one of these links. The processing of personal data on YouTube is governed by the provider’s privacy policy: https://policies.google.com/privacy?hl=en',
          ],
        },
        {
          heading: '6. Your rights',
          lines: [
            'Subject to the applicable legal requirements, you have the right to access, rectification, erasure, restriction of processing and data portability.',
            'Where processing is based on your consent, you may withdraw it at any time with effect for the future. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.',
            'You may lodge a complaint with a data protection supervisory authority, particularly in the Member State of your habitual residence, place of work or the place of the alleged infringement.',
            'To exercise your rights, please use the contact details provided above.',
          ],
        },
        {
          heading: '7. Right to object',
          lines: [
            'Where processing is based on Article 6(1)(f) GDPR, you have the right to object at any time on grounds relating to your particular situation.',
            'We will then cease processing the data concerned unless we can demonstrate compelling legitimate grounds which override your interests, rights and freedoms, or the processing serves the establishment, exercise or defence of legal claims.',
          ],
        },
      ],
    },
  },
  pt: {
    imprint: {
      title: 'Aviso legal',
      sections: [
        {
          heading: 'Informações nos termos do § 5 da DDG (lei alemã dos serviços digitais)',
          layout: 'stacked',
          lines: ['{name}', '{street}', '{postalCity}', '{country}'],
        },
        {
          heading: 'Contato',
          layout: 'stacked',
          lines: ['E-mail: {email}', 'Telefone: {phone}'],
        },
      ],
    },

    privacy: {
      title: 'Política de Privacidade',
      sections: [
        {
          heading: '1. Responsável',
          layout: 'stacked',
          lines: [
            'O responsável pelo tratamento de dados pessoais em denisonsilva.com é:',
            '{name}',
            '{street}',
            '{postalCity}',
            '{country}',
            'E-mail: {email}',
          ],
        },
        {
          heading: '2. Hospedagem e disponibilização do site',
          lines: [
            'Este site e os serviços de e-mail são operados na ALL-INKL.COM – Neue Medien Münnich, proprietário: René Münnich, Hauptstraße 68, 02742 Friedersdorf, Alemanha.',
            'Ao acessar o site, são tratados dados tecnicamente necessários, em especial o seu endereço IP, o momento do acesso, os conteúdos solicitados e as informações técnicas transmitidas pelo seu navegador. Esses dados podem ser registrados em protocolos do servidor.',
            'O tratamento destina-se à disponibilização, à segurança e à estabilidade do site. A base legal é o art. 6.º, n.º 1, al. f), do RGPD. O nosso interesse legítimo consiste na operação segura e confiável do site.',
            'Os dados técnicos de acesso são conservados apenas pelo tempo necessário para disponibilizar o site e para detectar e esclarecer falhas ou incidentes de segurança.',
            'As fontes tipográficas utilizadas estão armazenadas no servidor deste site. Para isso, não são estabelecidas conexões com fornecedores externos de fontes.',
          ],
        },
        {
          heading: '3. Formulário de contato e e-mail',
          lines: [
            'Se você entrar em contato conosco pelo formulário ou por e-mail, tratamos o seu endereço de e-mail, a sua mensagem e os demais dados que você nos transmitir, a fim de responder à sua solicitação e tratar eventuais questões posteriores.',
            'A transmissão e o tratamento das mensagens ocorrem por meio da infraestrutura de hospedagem e e-mail da ALL-INKL.',
            'Se a sua solicitação se destinar à celebração ou à execução de um contrato, o tratamento baseia-se no art. 6.º, n.º 1, al. b), do RGPD. Nas demais solicitações, a base legal é o art. 6.º, n.º 1, al. f), do RGPD. O nosso interesse legítimo consiste no tratamento das solicitações recebidas.',
            'O fornecimento dos seus dados é voluntário. Sem as informações necessárias ao tratamento e sem uma forma de contato, poderemos não conseguir responder à sua solicitação.',
            'As solicitações são apagadas assim que o seu tratamento estiver concluído e os dados deixarem de ser necessários para a comunicação posterior, para a execução do contrato ou para a declaração, o exercício ou a defesa de direitos. Os prazos legais de conservação permanecem inalterados.',
            'Na medida em que existam obrigações legais de conservação, o armazenamento baseia-se no art. 6.º, n.º 1, al. c), do RGPD. A conservação necessária à salvaguarda de direitos baseia-se no art. 6.º, n.º 1, al. f), do RGPD.',
          ],
        },
        {
          heading: '4. Destinatários',
          lines: [
            'A ALL-INKL, na qualidade de prestadora de serviços de hospedagem e e-mail, trata os dados necessários à prestação desses serviços.',
            'Qualquer transmissão além dessa ocorre apenas quando for necessária à execução de um contrato, quando houver obrigação legal ou quando você tiver consentido.',
          ],
        },
        {
          heading: '5. Links para o YouTube',
          lines: [
            'Este site contém links externos para o YouTube. Não há vídeos do YouTube incorporados nem miniaturas do YouTube carregadas externamente.',
            'Você acessa o YouTube somente ao abrir um desses links. O tratamento de dados pessoais nessa plataforma rege-se pela política de privacidade do fornecedor: https://policies.google.com/privacy?hl=pt-BR',
          ],
        },
        {
          heading: '6. Os seus direitos',
          lines: [
            'Nos termos legais, você tem direito de acesso, retificação, apagamento, limitação do tratamento e portabilidade dos dados.',
            'Quando o tratamento se basear no seu consentimento, você pode retirá-lo a qualquer momento, com efeitos para o futuro. A licitude do tratamento realizado até a retirada permanece inalterada.',
            'Você pode apresentar reclamação a uma autoridade de controle da proteção de dados, em especial no Estado-Membro da sua residência habitual, do seu local de trabalho ou do local da suposta infração.',
            'Para exercer os seus direitos, utilize os dados de contato indicados acima.',
          ],
        },
        {
          heading: '7. Direito de oposição',
          lines: [
            'Quando o tratamento se basear no art. 6.º, n.º 1, al. f), do RGPD, você tem o direito de se opor a qualquer momento, por motivos relacionados com a sua situação particular.',
            'Nesse caso, deixaremos de tratar os dados em questão, salvo se pudermos demonstrar motivos legítimos imperiosos que prevaleçam sobre os seus interesses, direitos e liberdades, ou se o tratamento se destinar à declaração, ao exercício ou à defesa de direitos.',
          ],
        },
      ],
    },
  },
}

const BINDING_NOTICE: Record<LegalLanguage, string> = {
  de: '',
  en: 'This is a translation provided for convenience. The German version of this document is the legally binding one.',
  pt: 'Esta é uma tradução disponibilizada para facilitar a leitura. A versão alemã deste documento é a juridicamente vinculativa.',
}

export interface ResolvedLegal extends LegalLocale {
  locale: LegalLanguage
  notice: string
}

export function resolveLegal(language: string): ResolvedLegal {
  const short = language.split('-')[0]
  const locale: LegalLanguage = short in CONTENT ? (short as LegalLanguage) : 'en'
  const country = ENTITY.country[locale]
  const content = CONTENT[locale]

  const render = (document: LegalDocument): LegalDocument => ({
    title: document.title,
    sections: document.sections.map((section) => ({
      ...section,
      lines: section.lines.map((line) => fill(line, country)),
    })),
  })

  return {
    locale,
    imprint: render(content.imprint),
    privacy: render(content.privacy),
    notice: BINDING_NOTICE[locale],
  }
}
