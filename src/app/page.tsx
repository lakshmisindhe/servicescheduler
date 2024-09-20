'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

import { format } from 'date-fns'

// Type definition for a client
type Client = {
  id: number
  hardwareId: string
  installationDate: string
  serviceDueDate: string
  companyName: string
  companyAddress: string
  companyGST: string
  contactNumber: string
}

export default function HomePage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Load clients from localStorage on component mount
    const storedClients = localStorage.getItem('clients')
    if (storedClients) {
      setClients(JSON.parse(storedClients))
    }

    // Check for new client data in sessionStorage
    const newClientData = sessionStorage.getItem('newClientData')
    if (newClientData) {
      const newClient = JSON.parse(newClientData)
      setClients(prevClients => {
        const updatedClients = [...prevClients, { ...newClient, id: Date.now() }]
        localStorage.setItem('clients', JSON.stringify(updatedClients))
        return updatedClients
      })
      sessionStorage.removeItem('newClientData')
    }
  }, [])

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.hardwareId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const upcomingServices = clients
    .filter(client => {
      const dueDate = new Date(client.serviceDueDate)
      const today = new Date()
      const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
      return dueDate >= today && dueDate <= thirtyDaysFromNow
    })
    .sort((a, b) => new Date(a.serviceDueDate).getTime() - new Date(b.serviceDueDate).getTime())

  const getServiceDueColor = (dueDateString: string) => {
    const today = new Date()
    const dueDate = new Date(dueDateString)
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

    if (daysUntilDue <= 7) return 'text-red-500'
    if (daysUntilDue <= 30) return 'text-yellow-500'
    return 'text-green-500'
  }

  const isDateInCurrentWeek = (date: Date) => {
    const now = new Date()
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 6)
    return date >= startOfWeek && date <= endOfWeek
  }

  const hasServiceDueOn = (date: Date) => {
    return clients.some(client => 
      format(new Date(client.serviceDueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Management Dashboard</h1>
        <Link href="/addnewclient">
          <Button>Add New Client</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search by company name or hardware ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Client Database</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hardware ID</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Installation Date</TableHead>
                    <TableHead>Service Due Date</TableHead>
                    <TableHead>GST</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.hardwareId}</TableCell>
                        <TableCell>{client.companyName}</TableCell>
                        <TableCell>{client.installationDate}</TableCell>
                        <TableCell className={getServiceDueColor(client.serviceDueDate)}>
                          {client.serviceDueDate}
                        </TableCell>
                        <TableCell>{client.companyGST}</TableCell>
                        <TableCell>{client.contactNumber}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">No clients found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Service Due Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  currentWeek: (date) => isDateInCurrentWeek(date),
                  hasServiceDue: (date) => hasServiceDueOn(date),
                }}
                modifiersStyles={{
                  currentWeek: { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                  hasServiceDue: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
                }}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Services (Next 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Hardware ID</TableHead>
                    <TableHead>Service Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingServices.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.companyName}</TableCell>
                      <TableCell>{client.hardwareId}</TableCell>
                      <TableCell className={getServiceDueColor(client.serviceDueDate)}>
                        {client.serviceDueDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}