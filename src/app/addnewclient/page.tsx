'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function AddClientPage() {
  const router = useRouter()
  const [hardwareId, setHardwareId] = useState('')
  const [installationDate, setInstallationDate] = useState<Date | undefined>(undefined)
  const [serviceDueDate, setServiceDueDate] = useState<Date | undefined>(undefined)
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newClient = {
      hardwareId,
      installationDate: installationDate?.toISOString(),
      serviceDueDate: serviceDueDate?.toISOString(),
      companyName,
      companyAddress,
      contactNumber
    }

    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    if (response.ok) {
      router.push('/');
    } else {
      // Handle error (e.g., show an error message to the user)
      console.error('Failed to add new client');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Client</h1>
        <Link href="/">
          <Button variant="outline">Back to Client List</Button>
        </Link>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hardwareId">Hardware ID</Label>
              <Input 
                id="hardwareId" 
                value={hardwareId}
                onChange={(e) => setHardwareId(e.target.value)}
                placeholder="Enter hardware ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationDate">Installation Date</Label>
              <Calendar
                mode="single"
                selected={installationDate}
                onSelect={setInstallationDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDueDate">Service Due Date</Label>
              <Calendar
                mode="single"
                selected={serviceDueDate}
                onSelect={setServiceDueDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea 
                id="companyAddress" 
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Enter company address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input 
                id="contactNumber" 
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter contact number"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>Save Client</Button>
        </CardFooter>
      </Card>
    </div>
  )
}