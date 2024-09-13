import { NextResponse } from 'next/server';

// This is a temporary storage solution. In a real app, you'd use a database.
let clients = [];

export async function GET() {
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const newClient = await request.json();
  clients.push(newClient);
  return NextResponse.json(newClient, { status: 201 });
}