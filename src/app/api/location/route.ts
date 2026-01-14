import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Location from '@/models/Location';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headers = request.headers;
    const userAgent = headers.get('user-agent') || 'Unknown';

    await connectToDatabase();

    const location = await Location.create({
      latitude: body.latitude,
      longitude: body.longitude,
      userAgent,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, id: location._id });
  } catch (error) {
    console.error('Error saving location:', error);
    return NextResponse.json({ success: false, error: 'Failed to save location' }, { status: 500 });
  }
}
