import Link from 'next/link';

const POPULAR_CONVERTERS = [
  { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
  { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
  { href: '/flac-to-mp3', label: 'FLAC to MP3' },
  { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
  { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
  { href: '/ogg-to-mp3',  label: 'OGG to MP3'  },
  { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
  { href: '/wma-to-mp3',  label: 'WMA to MP3'  },
];

const AUDIO_FORMATS = [
  { href: '/formats/mp3',  label: 'What is MP3'  },
  { href: '/formats/wav',  label: 'What is WAV'  },
  { href: '/formats/flac', label: 'What is FLAC' },
  { href: '/formats/m4a',  label: 'What is M4A'  },
  { href: '/formats/aac',  label: 'What is AAC'  },
  { href: '/formats/ogg',  label: 'What is OGG'  },
];

const GUIDES = [
  { href: '/guides/mp3-vs-wav',                    label: 'MP3 vs WAV'               },
  { href: '/guides/lossless-vs-lossy-audio',       label: 'Lossless vs Lossy Audio'  },
  { href: '/guides/extract-audio-from-video',      label: 'Extract Audio from Video' },
  { href: '/guides/troubleshooting-audio-conversion', label: 'Troubleshooting'       },
];

const LEARN = [
  { href: '/learn/when-mp3-is-good-enough',                    label: 'When MP3 Is Good Enough'      },
  { href: '/learn/wav-vs-mp3-editing-sharing-archiving',       label: 'WAV vs MP3 by Workflow'        },
  { href: '/learn/how-bitrate-affects-file-size-and-sound',    label: 'How Bitrate Works'             },
  { href: '/learn/converting-to-wav-does-not-improve-quality', label: 'WAV Doesn\'t Improve MP3'     },
  { href: '/learn/aac-m4a-mp3-what-matters',                   label: 'AAC, M4A, and MP3'             },
  { href: '/learn/why-audio-files-fail-to-convert',            label: 'Why Conversions Fail'          },
];

const COMPANY = [
  { href: '/about',      label: 'About'            },
  { href: '/contact',    label: 'Contact'           },
  { href: '/formats',    label: 'All Formats'       },
  { href: '/converters', label: 'All Converters'    },
  { href: '/privacy',    label: 'Privacy Policy'    },
  { href: '/terms',      label: 'Terms of Service'  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-12 sm:mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-4">

          {/* Brand — spans full width on mobile */}
          <div className="col-span-2 md:col-span-1 md:col-start-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <span className="font-bold text-white text-base">QuickAudioConvert</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500 mb-3">
              Free online audio conversion. Server-side processing, no account required.
            </p>
            <p className="text-xs text-gray-600">
              Files deleted after 30 minutes.
            </p>
            <a
              href="mailto:quickaudioconvert@protonmail.com"
              className="mt-3 inline-block text-xs text-gray-500 hover:text-white transition-colors"
            >
              quickaudioconvert@protonmail.com
            </a>
          </div>

          {/* Converters */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Converters
            </h3>
            <ul className="space-y-2">
              {POPULAR_CONVERTERS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-xs text-gray-500 hover:text-white transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/converters" className="text-xs text-brand hover:text-white transition-colors">
                  All converters →
                </Link>
              </li>
            </ul>
          </div>

          {/* Formats */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Audio Formats
            </h3>
            <ul className="space-y-2">
              {AUDIO_FORMATS.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="text-xs text-gray-500 hover:text-white transition-colors">
                    {f.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/formats" className="text-xs text-brand hover:text-white transition-colors">
                  All formats →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Guides
            </h3>
            <ul className="space-y-2">
              {GUIDES.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-xs text-gray-500 hover:text-white transition-colors">
                    {g.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guides" className="text-xs text-brand hover:text-white transition-colors">
                  All guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Learn
            </h3>
            <ul className="space-y-2">
              {LEARN.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-gray-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/learn" className="text-xs text-brand hover:text-white transition-colors">
                  All articles →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-xs text-gray-500 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} QuickAudioConvert. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 text-center sm:text-right">
            Uploaded files are automatically deleted. We do not store your data.
          </p>
        </div>

      </div>
    </footer>
  );
}
