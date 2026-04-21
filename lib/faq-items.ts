export interface FAQItem {
  question: string;
  answer: string;
}

export const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What file formats are supported?',
    answer:
      'QuickAudioConvert accepts MP4, MOV, WAV, FLAC, ALAC, M4A, MP3, AAC, OGG, AIFF, AMR, AC3, WMA, Opus, and more as input. Output formats are MP3, WAV, M4A, FLAC, AAC, OGG, and OPUS. Not every output is available for every input — for example, FLAC output is only offered from lossless sources (WAV, AIFF, ALAC), since encoding a lossy file to FLAC does not restore quality. After you upload, the converter shows which outputs are valid for your specific file.',
  },
  {
    question: 'Are my files stored permanently?',
    answer:
      'No. Uploaded files and converted output files are automatically deleted after a short window (typically 5 minutes). We do not keep permanent copies of your files and do not share them with anyone.',
  },
  {
    question: 'Can I convert a video file (MP4, MOV) to audio?',
    answer:
      'Yes. Upload an MP4 or MOV file and the converter will extract the audio track. You can save it as MP3, WAV, M4A, AAC, OGG, or OPUS. The video data is discarded — only the audio is retained in the output file.',
  },
  {
    question: 'Why do I see different output format options for different files?',
    answer:
      'Available outputs depend on your source file. Uploading a WAV shows the full range including FLAC (since WAV is uncompressed, converting to FLAC is a genuine lossless compression). Uploading an MP3 does not show FLAC as an option — encoding a lossy file to lossless would produce a large file with identical lossy quality, which is misleading. The converter only shows conversions that are technically meaningful.',
  },
  {
    question: 'Does QuickAudioConvert work on mobile?',
    answer:
      'Yes. The site works on modern mobile browsers on iOS and Android. You can upload files directly from your device. Downloads are handled in a way that is compatible with iOS Safari.',
  },
  {
    question: 'Can I choose audio quality?',
    answer:
      'Yes, for MP3, AAC, OGG, and OPUS output. Choose from 128 kbps (smaller file, good quality), 192 kbps (balanced — recommended for most uses), or 320 kbps (maximum quality, larger file). WAV and FLAC are lossless — bitrate does not apply. M4A uses a fixed 192 kbps AAC encode.',
  },
];
