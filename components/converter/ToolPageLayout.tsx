import ConverterBox from './ConverterBox';
import FAQ, { type FAQItem } from '@/components/marketing/FAQ';
import LastUpdated from '@/components/content/LastUpdated';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import {
  softwareApplicationSchema,
  faqPageSchema,
  howToSchema,
} from '@/lib/seo';
import type { InputFormat, OutputFormat } from '@/types/conversion';

interface RelatedTool {
  href: string;
  label: string;
}

interface RelatedGuide {
  href: string;
  label: string;
}

interface ToolPageLayoutProps {
  /** URL path for this converter, e.g. "/mp4-to-mp3". Used for breadcrumbs and schema. */
  slug: string;
  title: string;
  subtitle: string;
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  sourceFormatInfo: { name: string; description: string };
  targetFormatInfo: { name: string; description: string };
  whyConvert: string;
  faqItems: FAQItem[];
  relatedTools: RelatedTool[];
  /** Optional links to format pages and guides — shown below related tools */
  relatedGuides?: RelatedGuide[];
  /** ISO date string for "Last updated" — e.g. "2025-03-01" */
  lastUpdated?: string;
  /** Optional factual callout shown below the converter and above the format info cards */
  converterNote?: string;
}

export default function ToolPageLayout({
  slug,
  title,
  subtitle,
  inputFormat,
  outputFormat,
  sourceFormatInfo,
  targetFormatInfo,
  whyConvert,
  faqItems,
  relatedTools,
  relatedGuides,
  lastUpdated,
  converterNote,
}: ToolPageLayoutProps) {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: title,
            description: subtitle,
            url: slug,
            featureList: [
              `Convert ${sourceFormatInfo.name} to ${targetFormatInfo.name}`,
              'Server-side FFmpeg processing',
              'No account or install required',
              'Files auto-deleted after 5 minutes',
            ],
          }),
          howToSchema({
            name: `How to convert ${sourceFormatInfo.name} to ${targetFormatInfo.name}`,
            description: `Convert a ${sourceFormatInfo.name} file to ${targetFormatInfo.name} format online, free, with no account.`,
            steps: [
              {
                name: `Upload your ${sourceFormatInfo.name} file`,
                text: `Drag and drop a ${sourceFormatInfo.name} file, or click to browse. Maximum size is 200 MB.`,
              },
              {
                name: `Select ${targetFormatInfo.name} as the output format`,
                text: `Choose ${targetFormatInfo.name} from the output options. For MP3/AAC/OGG/OPUS output you can also pick a bitrate.`,
              },
              {
                name: 'Convert and download',
                text: `Click Convert. When processing finishes, download your ${targetFormatInfo.name} file. Files are deleted from our servers within 5 minutes.`,
              },
            ],
          }),
          faqPageSchema(
            faqItems.map((f) => ({ question: f.question, answer: f.answer })),
          ),
        ]}
      />

      {/* Hero + converter */}
      <section className="bg-[#2B2B2F] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-lg mx-auto">{subtitle}</p>
        </div>
        <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConverterBox
            presetInputFormat={inputFormat}
            presetOutputFormat={outputFormat}
          />
          <p className="text-center text-xs text-[#8B745A]/70 mt-3">
            Output formats shown are based on the file you upload — you may see additional options.
          </p>
        </div>
      </section>

      {/* Breadcrumb trail */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Converters', path: '/converters' },
              { name: title.replace(/ Converter$/, ''), path: slug },
            ]}
          />
        </div>
      </div>

      {/* Converter note */}
      {converterNote && (
        <section className="bg-slate-800 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-sm text-gray-300 leading-relaxed">{converterNote}</p>
          </div>
        </section>
      )}

      {/* Format info + why convert */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
                About {sourceFormatInfo.name}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{sourceFormatInfo.description}</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-[#D9D9D9]">
              <h2 className="text-sm font-semibold text-brand uppercase tracking-widest mb-2">
                About {targetFormatInfo.name}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{targetFormatInfo.description}</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-2">
              When to convert {sourceFormatInfo.name} to {targetFormatInfo.name}
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              {whyConvert.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* Related tools */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Related converters
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-4 py-2 rounded-xl bg-white border border-[#D9D9D9] text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm"
              >
                {tool.label}
              </Link>
            ))}
          </div>

          {relatedGuides && relatedGuides.length > 0 && (
            <>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Related guides
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="px-4 py-2 rounded-xl bg-white border border-[#D9D9D9] text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm"
                  >
                    {guide.label}
                  </Link>
                ))}
              </div>
            </>
          )}

          {lastUpdated && (
            <LastUpdated date={lastUpdated} />
          )}
        </div>
      </section>
    </>
  );
}
