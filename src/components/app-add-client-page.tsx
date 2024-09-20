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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

declare module 'file-saver';

export function Page() {
  const router = useRouter()
  const [hardwareId, setHardwareId] = useState('')
  const [installationDate, setInstallationDate] = useState<Date | undefined>(undefined)
  const [serviceDueDate, setServiceDueDate] = useState<Date | undefined>(undefined)
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newClient = {
      hardwareId,
      installationDate,
      serviceDueDate,
      companyName,
      companyAddress,
      contactNumber
    };

    // Create a new workbook and add a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([newClient]);
    XLSX.utils.book_append_sheet(wb, ws, "New Client");

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Save the file
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'test.xlsx');

    console.log('New client saved to Excel file:', newClient);

    // Redirect to the homepage after submission
    router.push('/');
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