import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || typeof name !== 'string' || name.trim().length < 1) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
  }

  // Log submission to server output (replace with email/webhook integration as needed).
  console.log('[contact]', {
    name: name.trim(),
    email: email.trim(),
    subject: subject?.trim() || '(no subject)',
    messageLength: message.trim().length,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
