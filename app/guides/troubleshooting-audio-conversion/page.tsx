import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'Why Did My Audio Conversion Fail?',
  description:
    'Common reasons an audio conversion fails on QuickAudioConvert — unsupported formats, corrupt files, file size limits, and how to fix each one.',
};

export default function TroubleshootingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/guides" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Guides
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Troubleshooting</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Why Did My Audio Conversion Fail?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          Most conversion failures have a specific, fixable cause. Here are the most common
          ones — and what to do about each.
        </p>
      </div>

      <div className="space-y-6">

        {/* Problem 1 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">The file format is not supported</h2>
          <p className="text-xs text-gray-400 mb-3">Error: "Unsupported format" or upload is rejected immediately</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            QuickAudioConvert accepts specific input formats. If you upload a file that is
            not on the supported list, it will be rejected.
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-1">Supported input formats:</p>
          <p className="text-sm text-gray-600">
            MP4, MOV, WAV, M4A, FLAC, ALAC, MP3, AAC, OGG, AIFF, AIFC, AMR, AC3, OPUS, WMA, OGA, WEBA
          </p>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Fix:</strong> Check your file extension and{' '}
            <Link href="/formats" className="text-brand hover:underline">compare it against the supported formats</Link>.
            If your format is not listed, you may need a local conversion tool to
            first convert it to a supported format.
          </p>
        </div>

        {/* Problem 2 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">The file is too large</h2>
          <p className="text-xs text-gray-400 mb-3">Error: "File size exceeds the maximum" or upload is blocked</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            The maximum upload size is 200 MB. Video files, high-resolution WAV files,
            and long recordings can exceed this.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Fix:</strong> Trim the file to a shorter section before uploading.
            For video files, tools like VLC or Handbrake can trim without re-encoding.
            For audio files, Audacity can trim and export in any format. Alternatively,
            use a local conversion tool — FFmpeg handles any file size with no upload required.
          </p>
        </div>

        {/* Problem 3 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">The file appears corrupt or unreadable</h2>
          <p className="text-xs text-gray-400 mb-3">Error: "Conversion failed" after processing begins</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            If a file uploads successfully but the conversion fails partway through, the
            file may be corrupt, incomplete, or structured in a way that FFmpeg cannot
            parse. This can happen with files from:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex gap-2"><span className="flex-shrink-0">—</span>Interrupted downloads (the file was not fully downloaded before upload)</li>
            <li className="flex gap-2"><span className="flex-shrink-0">—</span>Screen recorders or capture tools that use non-standard containers</li>
            <li className="flex gap-2"><span className="flex-shrink-0">—</span>Files with a mismatched extension (e.g. a file renamed from .mp4 that is actually an MKV)</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Fix:</strong> Try opening the file locally in VLC — if VLC can't play it,
            the file is likely damaged. Re-download or re-export the original. If VLC plays it,
            the file is valid; try re-uploading or contact us with the file details.
          </p>
        </div>

        {/* Problem 4 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">The video file has no audio track</h2>
          <p className="text-xs text-gray-400 mb-3">Error: "No audio stream found" or output file is empty/silent</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Some video files — particularly screen recordings, slideshows, or animation
            exports — have no audio track at all. The converter cannot extract audio from
            a file that doesn't have any.
          </p>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Fix:</strong> Open the file in VLC and check whether audio plays.
            If there is no audio when you play the original, there is nothing for the
            converter to extract.
          </p>
        </div>

        {/* Problem 5 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">The download expired</h2>
          <p className="text-xs text-gray-400 mb-3">Error: "File not found" or download link no longer works</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Converted files are available for download for 30 minutes after conversion.
            After that, they are permanently deleted. There is no way to recover a file
            once it has been deleted.
          </p>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Fix:</strong> Upload and convert the file again. Conversion is fast —
            it usually takes only a few seconds.
          </p>
        </div>

        {/* Problem 6 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">Rate limit reached</h2>
          <p className="text-xs text-gray-400 mb-3">Error: "Too many requests" or upload is blocked</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            The converter applies a rate limit of 10 requests per minute per IP address to
            prevent abuse. If you are converting many files in quick succession, you may
            hit this limit.
          </p>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Fix:</strong> Wait a minute and try again.
          </p>
        </div>

        {/* Problem 7 */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">DRM-protected file</h2>
          <p className="text-xs text-gray-400 mb-3">Conversion fails or produces silent output</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Files protected with DRM (Digital Rights Management) — such as older iTunes
            purchases or streaming service downloads — cannot be converted by this or any
            other online tool. DRM protection is intentionally designed to prevent conversion.
          </p>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Fix:</strong> Check whether your file is DRM-free. Most music purchased
            from iTunes today is DRM-free. If the file plays in a specific app but nowhere
            else, it is likely DRM-protected.
          </p>
        </div>

      </div>

      {/* Contact CTA */}
      <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-sm font-bold text-gray-900 mb-2">Still having trouble?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          If your problem is not listed above, or the suggested fix didn't work,{' '}
          <Link href="/contact" className="text-brand hover:underline">contact us</Link>{' '}
          with a description of the error, your file format, the file size, and which
          browser you are using. That information helps us diagnose the issue quickly.
        </p>
      </div>

      <RelatedContent
        title="Related"
        items={[
          { href: '/formats',    label: 'Supported formats'     },
          { href: '/contact',    label: 'Contact support'       },
          { href: '/privacy',    label: 'Privacy policy'        },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
