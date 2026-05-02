import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How QuickAudioConvert handles your files, cookies, analytics, and advertising. Uploaded files are processed server-side and deleted automatically within 5 minutes — never stored permanently.',
  alternates: {
    canonical: '/privacy',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: April 2026</p>
      </div>

      <Section title="Introduction">
        <p>
          QuickAudioConvert (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains what data is collected when you use our service, how it is used, who it is shared with, and when it is deleted.
        </p>
        <p>
          By using QuickAudioConvert, you agree to the practices described in this policy. If you do not agree, please do not use the service.
        </p>
      </Section>

      <Section title="Files You Upload">
        <p>
          When you upload a file for conversion, it is stored temporarily on our servers for the sole purpose of processing your conversion request. Uploaded files are not shared with any third party, indexed for search, mined for content, or used to train models.
        </p>
        <p>
          <strong>Temporary retention:</strong> Uploaded files and converted output files are automatically deleted from our servers within approximately 5 minutes of upload. The retention window is enforced by an automated cleanup job — files are removed whether you download them or not. We do not maintain permanent archives or backups of user-uploaded content.
        </p>
        <p>
          Files are stored using randomized, non-guessable identifiers and are accessible only via the unique download link returned to your browser session. We do not list, browse, or expose the temporary storage directory.
        </p>
        <p>
          You are responsible for only uploading files you own or have authorization to convert. Do not upload personal documents, confidential content, or files that contain sensitive information.
        </p>
      </Section>

      <Section title="No Account Required">
        <p>
          QuickAudioConvert does not require you to create an account. We do not collect your name, email address, or any other directly identifying information as part of the normal conversion flow. If you choose to email us through the Contact page, the contents of that email are kept solely for the purpose of replying to your enquiry.
        </p>
      </Section>

      <Section title="Usage Data and Server Logs">
        <p>
          Our servers automatically record standard request metadata required to operate the service and protect it from abuse. This may include:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>IP address (used for rate limiting and security; not linked to a user identity)</li>
          <li>Browser user-agent string and approximate geographic region</li>
          <li>Page visited, conversion type requested, and timestamp</li>
          <li>Errors and diagnostic information when conversions fail</li>
        </ul>
        <p>
          These records are short-lived and are not used to build long-term user profiles. They exist to keep the service running, prevent abuse, and improve reliability.
        </p>
      </Section>

      <Section title="Analytics">
        <p>
          QuickAudioConvert uses <strong>Google Analytics 4</strong> to collect anonymized usage data. This service uses cookies to distinguish unique visitors and measure how the site is used. The data collected includes pages visited, session duration, browser type, device type, and approximate geographic region (country or city level). This data is aggregated and not linked to individually identifiable users.
        </p>
        <p>
          Google Analytics data is processed by Google LLC and subject to{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Google&apos;s Privacy Policy
          </a>
          . You can opt out of Google Analytics tracking by installing the{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>
      </Section>

      <Section title="Advertising (Google AdSense)">
        <p>
          QuickAudioConvert uses <strong>Google AdSense</strong> to display advertisements that help fund the free service. Google is a third-party vendor and may use cookies and similar technologies to serve ads based on a user&apos;s prior visits to this and other websites. AdSense may also use the DoubleClick DART cookie to deliver more relevant ads.
        </p>
        <p>
          When AdSense ads are served, Google and its partners may collect data such as:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cookie identifiers and ad interaction events (impressions, clicks)</li>
          <li>IP address, user-agent, approximate location, and device type</li>
          <li>Pages on this site where ads were viewed</li>
        </ul>
        <p>
          You can review and control how Google personalises ads by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Google Ads Settings
          </a>
          . You can opt out of personalised advertising from many vendors at{' '}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            aboutads.info/choices
          </a>{' '}
          (US) or{' '}
          <a
            href="https://www.youronlinechoices.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            youronlinechoices.eu
          </a>{' '}
          (EU/UK). We do not pass personally identifiable information to Google. We do not use uploaded audio files for advertising or analytics purposes — files exist only on the conversion server and are deleted automatically.
        </p>
        <p>
          For users in the European Economic Area (EEA), the United Kingdom, and Switzerland, ads are served in compliance with the IAB Transparency &amp; Consent Framework and Google&apos;s consent requirements. Where required, Google&apos;s consent management may request your preferences before personalised ads are shown. You can review Google&apos;s advertising practices at{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            policies.google.com/technologies/ads
          </a>
          .
        </p>
      </Section>

      <Section title="Cookies Summary">
        <p>
          QuickAudioConvert uses the following cookie categories:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Strictly necessary</strong> — short-lived session and security cookies needed to upload files, deliver downloads, and prevent abuse. These cannot be disabled without breaking the service.
          </li>
          <li>
            <strong>Analytics</strong> — Google Analytics cookies (e.g. <code>_ga</code>, <code>_ga_*</code>) used to measure page visits and feature usage.
          </li>
          <li>
            <strong>Advertising</strong> — Google AdSense cookies (e.g. <code>__gads</code>, <code>__gpi</code>, <code>IDE</code>) used to serve and measure advertisements, frequency-cap ads, and detect invalid clicks.
          </li>
        </ul>
        <p>
          You can clear or block cookies in your browser settings at any time. Blocking cookies will not prevent you from using the converter, but it may reduce the relevance of the ads shown.
        </p>
      </Section>

      <Section title="Data Sharing">
        <p>
          We do not sell or rent your personal data or uploaded files. The only third parties that receive any data through this site are:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Google Analytics</strong> — anonymised analytics events as described above.</li>
          <li><strong>Google AdSense</strong> — advertising-related data as described above.</li>
          <li>Hosting and infrastructure providers, strictly to operate the service.</li>
        </ul>
        <p>
          We may disclose information if required by law or in response to a valid legal process.
        </p>
      </Section>

      <Section title="Security">
        <p>
          We use HTTPS for all traffic and store uploaded files using randomized identifiers that are not publicly browsable. Conversion happens entirely server-side and the resulting files are deleted automatically. No system is completely secure and we cannot guarantee absolute security, but we apply reasonable technical and organisational measures to protect data in transit and at rest.
        </p>
      </Section>

      <Section title="Children's Privacy">
        <p>
          QuickAudioConvert is not directed at children under the age of 13. We do not knowingly collect any information from children. If you believe a child has used our service in a way that raises concerns, please contact us and we will remove any related data we hold.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          Depending on where you live, you may have rights under applicable data-protection laws (such as the UK GDPR, EU GDPR, and the California Consumer Privacy Act) including the right to access, correct, or delete personal data we hold about you, and the right to object to or restrict certain processing. Because the converter operates without accounts, the personal data we hold is minimal — usually limited to short-lived server logs and any email correspondence you have sent us. To exercise a right, email{' '}
          <a href="mailto:contact@quickaudioconvert.com" className="text-brand hover:underline">
            contact@quickaudioconvert.com
          </a>
          .
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be reflected on this page with an updated date at the top. Continued use of the service after changes constitutes acceptance of the revised policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions, concerns, or rights requests related to this Privacy Policy, please{' '}
          <a href="/contact" className="text-brand hover:underline">contact us by email</a>.
        </p>
      </Section>
    </div>
  );
}
