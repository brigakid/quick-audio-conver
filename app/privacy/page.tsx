import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how QuickAudioConvert handles your files and data. We do not store your files permanently.',
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
        <p className="mt-3 text-sm text-gray-500">Last updated: March 2026</p>
      </div>

      <Section title="Introduction">
        <p>
          QuickAudioConvert (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains what data is collected when you use our service, how it is used, and when it is deleted.
        </p>
        <p>
          By using QuickAudioConvert, you agree to the practices described in this policy.
        </p>
      </Section>

      <Section title="Files You Upload">
        <p>
          When you upload a file for conversion, it is stored temporarily on our servers for the sole purpose of processing your conversion request. Uploaded files are not shared with any third parties, indexed, or analyzed beyond what is necessary to complete your conversion.
        </p>
        <p>
          <strong>Temporary retention:</strong> Uploaded files and converted output files are automatically deleted from our servers within 30 minutes of upload. We do not maintain permanent archives or backups of user-uploaded content.
        </p>
        <p>
          You are responsible for only uploading files you own or have authorization to convert. Do not upload personal documents, confidential content, or files that contain sensitive information.
        </p>
      </Section>

      <Section title="No Account Required">
        <p>
          QuickAudioConvert does not require you to create an account. We do not collect your name, email address, or any personally identifiable information as part of the normal conversion flow.
        </p>
      </Section>

      <Section title="Usage Data">
        <p>
          We may collect basic, anonymized usage data to understand how the service is used and to improve it. This may include:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Pages visited and features used</li>
          <li>Browser type and operating system (anonymized)</li>
          <li>General geographic region (country-level)</li>
          <li>Conversion format types (aggregated, not linked to individuals)</li>
        </ul>
        <p>
          This data is not linked to any individual and is used solely for service improvement and capacity planning.
        </p>
      </Section>

      <Section title="Analytics and Cookies">
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
        <p>
          We do not use advertising cookies, remarketing cookies, or cross-site tracking technologies beyond Google Analytics.
        </p>
      </Section>

      <Section title="Data Sharing">
        <p>
          We do not sell, rent, or share your data or uploaded files with any third parties. We do not use your files for advertising or machine learning purposes.
        </p>
        <p>
          We may disclose information if required by law or in response to a valid legal process.
        </p>
      </Section>

      <Section title="Security">
        <p>
          We implement reasonable technical measures to protect uploaded files during transit and temporary storage. Files are stored using randomized identifiers and are not publicly accessible by URL guessing. However, no system is completely secure and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="Children's Privacy">
        <p>
          QuickAudioConvert is not directed at children under the age of 13. We do not knowingly collect any information from children. If you believe a child has used our service in a way that raises concerns, please contact us.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the service after changes constitutes acceptance of the revised policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions or concerns about this Privacy Policy, please use our{' '}
          <a href="/contact" className="text-brand hover:underline">contact form</a>.
        </p>
      </Section>
    </div>
  );
}
