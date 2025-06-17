import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('hero_settings')
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error fetching hero settings:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch hero settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('hero_settings')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        ...body,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error updating hero settings:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to update hero settings' },
      { status: 500 }
    );
  }
}