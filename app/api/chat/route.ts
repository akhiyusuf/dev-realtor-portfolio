import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '@/app/services/openrouter';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await chatWithAI(message);
    return NextResponse.json({ response });

  } catch (error: any) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
