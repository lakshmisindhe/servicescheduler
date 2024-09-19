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

export default function AddNewClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hardwareId: '',
    installationDate: undefined as Date | undefined,
    serviceDueDate: undefined as Date | undefined,
    companyName: '',
    companyAddress: '',
    companyGST: '',
    contactNumber: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save to sessionStorage
    sessionStorage.setItem('newClientData', JSON.stringify(formData))
    // Redirect to home page
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
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
            <div className="space-y-2">
              <Label htmlFor="hardwareId">Hardware ID</Label>
              <Input 
                id="hardwareId" 
                name="hardwareId"
                value={formData.hardwareId}
                onChange={handleChange}
                placeholder="Enter hardware ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationDate">Installation Date</Label>
              <Calendar
                mode="single"
                selected={formData.installationDate}
                onSelect={(date) => setFormData({ ...formData, installationDate: date })}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDueDate">Service Due Date</Label>
              <Calendar
                mode="single"
                selected={formData.serviceDueDate}
                onSelect={(date) => setFormData({ ...formData, serviceDueDate: date })}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea 
                id="companyAddress" 
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder="Enter company address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyGST">Company GST</Label>
              <Input 
                id="companyGST" 
                name="companyGST"
                value={formData.companyGST}
                onChange={handleChange}
                placeholder="Enter company GST number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input 
                id="contactNumber" 
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Save Client</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}