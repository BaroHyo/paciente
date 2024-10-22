 
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", department: "IT", lastLogin: "2023-06-15", projects: ["Project A", "Project B"] },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", department: "HR", lastLogin: "2023-06-14", projects: ["Project C"] },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", department: "Sales", lastLogin: "2023-06-13", projects: ["Project B", "Project D"] },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", department: "Marketing", lastLogin: "2023-06-12", projects: ["Project A", "Project C"] },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", department: "Finance", lastLogin: "2023-06-11", projects: ["Project D"] },
]

export default function Component() {
  const [selectedUser, setSelectedUser] = useState<any>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className={`cursor-pointer ${selectedUser?.id === user.id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell>{selectedUser.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Email</TableCell>
                    <TableCell>{selectedUser.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Role</TableCell>
                    <TableCell>{selectedUser.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Department</TableCell>
                    <TableCell>{selectedUser.department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Last Login</TableCell>
                    <TableCell>{selectedUser.lastLogin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Projects</TableCell>
                    <TableCell>{selectedUser.projects.join(", ")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <p>Select a user to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}