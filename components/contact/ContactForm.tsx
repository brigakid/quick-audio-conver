'use client';

import { useState, FormEvent } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const INPUT_CLASS =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-shadow';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg(null);

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Something went wrong. Please try again.');
      }

      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-brand-tint ring-1 ring-brand/15 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-brand"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">Message sent</p>
          <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Thank you for reaching out. We aim to reply within 1–2 business days.
          </p>
        </div>
        <button
          onClick={() => setState('idle')}
          className="mt-2 text-sm text-brand hover:text-brand-dark underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your name"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Subject
        </label>
        <select id="subject" name="subject" className={INPUT_CLASS}>
          <option value="">Select a topic</option>
          <option value="support">Technical support</option>
          <option value="bug">Report a bug</option>
          <option value="feature">Format or feature request</option>
          <option value="privacy">Privacy question</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Describe your issue or question..."
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {state === 'error' && errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
          <svg
            className="w-4 h-4 text-red-500 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full px-6 py-3 text-sm font-semibold bg-brand text-white rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        We aim to respond within 1–2 business days. For urgent issues, please include as much detail
        as possible.
      </p>
    </form>
  );
}
