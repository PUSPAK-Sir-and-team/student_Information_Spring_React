import axios from "axios";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch admin data from the backend API
    axios
      .get("https://student-information-spring-react.onrender.com/api/student")
      .then((res) => {
        setAdmins(res.data);
        console.log("Fetched admins:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching admins:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">
              <Checkbox />
            </TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Image URL</TableHeadCell>
            <TableHeadCell>Phone Number</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {admins.map((admin) => (
            <TableRow
              key={admin.adminId}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="p-4">
                <Checkbox />
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {admin.adminName}
              </TableCell>
              <TableCell>{admin.adminEmail}</TableCell>
              <TableCell>{admin.adminImgUrl}</TableCell>
              <TableCell>{admin.adminPhno}</TableCell>
              <TableCell>
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Edit
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
