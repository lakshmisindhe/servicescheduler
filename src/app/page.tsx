import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the Client interface
interface Client {
  id: string;
  companyName: string;
  hardwareId: string;
  installationDate: string;
  serviceDueDate: string;
  contactNumber: string;
}

// Make the component async
export default async function HomePage() {
  // Fetch clients data from the API
  const response = await fetch('http://localhost:3000/api/clients', { cache: 'no-store' });
  const clients: Client[] = await response.json();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client List</h1>
        <Link href="/addnewclient">
          <Button>Add New Client</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Hardware ID</TableHead>
                <TableHead>Installation Date</TableHead>
                <TableHead>Service Due Date</TableHead>
                <TableHead>Contact Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client: Client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.companyName}</TableCell>
                  <TableCell>{client.hardwareId}</TableCell>
                  <TableCell>{client.installationDate}</TableCell>
                  <TableCell>{client.serviceDueDate}</TableCell>
                  <TableCell>{client.contactNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}