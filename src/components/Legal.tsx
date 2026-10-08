import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  resolveLegal,
  type LegalDocument,
  type LegalSection,
} from "../data/legal";

export type LegalPage = "imprint" | "privacy";

export default function Legal({ page }: { page: LegalPage }) {
  const { t, i18n } = useTranslation();
  const legal = resolveLegal(i18n.resolvedLanguage ?? "en");
  const content = page === "imprint" ? legal.imprint : legal.privacy;

  return (
    <main className="min-h-screen bg-paper px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="link-underline text-small">
            {t("legal.back")}
          </a>
          <LanguageSwitcher />
        </div>
        <article lang={legal.locale}>
          <h1 className="display mt-12 text-h2 leading-none">
            {content.title}
          </h1>

          {legal.notice && (
            <p className="mt-5 border-l-2 border-rule pl-4 text-small text-chalk">
              {legal.notice}
            </p>
          )}

          <div className="mt-10 space-y-9">
            {content.sections.map((section) => (
              <Section key={section.heading} section={section} />
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}

function Section({ section }: { section: LegalSection }) {
  const stacked = section.layout === "stacked";

  return (
    <section>
      <h2 className="text-small text-chalk">{section.heading}</h2>

      {stacked ? (
        <p className="prose-col mt-2 leading-relaxed">
          {section.lines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {linkify(line)}
            </span>
          ))}
        </p>
      ) : (
        <div className="prose-col mt-2 space-y-3">
          {section.lines.map((line) => (
            <p key={line}>{linkify(line)}</p>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Turns the URLs and email addresses inside a line into real links. A
 * privacy policy that prints a supervisory authority's URL as plain text
 * is a policy nobody follows up on.
 */
const LINK_PATTERN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

function linkify(line: string): ReactNode {
  const parts = line.split(LINK_PATTERN);
  if (parts.length === 1) return line;

  return parts.map((part, index) => {
    if (index % 2 === 0) return part;

    // A sentence-ending dot or comma is punctuation, not part of the URL.
    const match = part.replace(/[.,;:)]+$/, "");
    const trailing = part.slice(match.length);
    const isEmail = !match.startsWith("http");

    return (
      <span key={`${match}-${index}`}>
        <a
          className="link-underline break-words"
          href={isEmail ? `mailto:${match}` : match}
          {...(isEmail ? {} : { target: "_blank", rel: "noreferrer noopener" })}
        >
          {match}
        </a>
        {trailing}
      </span>
    );
  });
}

export type { LegalDocument };
