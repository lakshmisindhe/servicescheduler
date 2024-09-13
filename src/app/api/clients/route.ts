import { NextResponse } from 'next/server';

// This is a temporary storage solution. In a real app, you'd use a database.
interface Client {
  id: string;
  companyName: string;
  hardwareId: string;
  installationDate: string;
  serviceDueDate: string;
  contactNumber: string;
}

const clients: Client[] = [];

export async function GET() {
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const newClient: Client = await request.json();
  clients.push(newClient);
  return NextResponse.json(newClient, { status: 201 });
}