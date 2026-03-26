import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for QuickAudioConvert. Read our usage rules, limitations, and legal disclaimers.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: March 2026</p>
      </div>

      <Section title="Acceptance of Terms">
        <p>
          By accessing or using QuickAudioConvert (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </Section>

      <Section title="Description of Service">
        <p>
          QuickAudioConvert is an online tool that allows users to upload audio and video files and convert them to common audio formats. The Service is provided on an &quot;as-is&quot; basis and is intended for personal and lawful use only.
        </p>
      </Section>

      <Section title="User Responsibilities">
        <p>
          By uploading a file to QuickAudioConvert, you represent and warrant that:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You are the owner of the file or have explicit permission from the copyright holder to convert it.</li>
          <li>The file does not contain illegal content, malware, or material that violates any applicable law.</li>
          <li>You will not use the Service to infringe the intellectual property rights of any third party.</li>
          <li>You will not attempt to upload files to gain unauthorized access to our systems or disrupt the Service.</li>
          <li>You are at least 13 years of age.</li>
        </ul>
        <p>
          We expressly prohibit using QuickAudioConvert to circumvent copyright protection or to distribute copyrighted content without authorization.
        </p>
      </Section>

      <Section title="Supported Formats and Limitations">
        <p>
          The Service currently supports a defined set of input and output audio formats. Not all file types are accepted. We reserve the right to limit the file size, conversion rate, or supported formats at any time without notice.
        </p>
        <p>
          Files exceeding the maximum size limit will be rejected. We do not guarantee successful conversion for all files — some may fail due to encoding issues, corruption, or unsupported format variants.
        </p>
      </Section>

      <Section title="Temporary File Storage">
        <p>
          Uploaded files and converted output files are stored temporarily on our servers for the purpose of completing your conversion. These files are automatically deleted within a short window (approximately 30 minutes). We do not retain permanent copies of user files.
        </p>
        <p>
          You are solely responsible for downloading your converted file within the available time window. We are not liable for files that are no longer available due to automatic deletion.
        </p>
      </Section>

      <Section title="Prohibited Use">
        <p>You may not use QuickAudioConvert for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Automated bulk conversion or scraping via bots or scripts</li>
          <li>Uploading content that violates copyright or licensing terms</li>
          <li>Any attempt to overload, attack, or exploit the Service</li>
          <li>Commercial redistribution of the Service or its output as your own product</li>
        </ul>
      </Section>

      <Section title="Disclaimer of Warranties">
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
        </p>
        <p>
          We do not guarantee that the Service will be uninterrupted, error-free, or that converted files will meet your specific requirements.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, QuickAudioConvert and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service, including but not limited to loss of data or files.
        </p>
        <p>
          Our total liability for any claim arising out of your use of the Service shall not exceed the amount you paid to use the Service, which in most cases is zero.
        </p>
      </Section>

      <Section title="Changes to Service and Terms">
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We may also update these Terms of Service at any time. Continued use of the Service after changes are posted constitutes your acceptance of the revised terms.
        </p>
      </Section>

      <Section title="Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Service shall be resolved in the appropriate jurisdiction.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions about these Terms of Service, please{' '}
          <a href="/contact" className="text-brand hover:underline">contact us by email</a>.
        </p>
      </Section>
    </div>
  );
}
