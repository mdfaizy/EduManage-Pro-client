import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

export default function BasicTableOne() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-700">Project Orders</h2>
        <p className="text-sm text-slate-500">Team project tracking overview</p>
      </div>

      <Table className="text-sm">

        <TableHeader>
          <TableRow>
            <TableCell isHeader>User</TableCell>
            <TableCell isHeader>Project</TableCell>
            <TableCell isHeader>Team</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader>Budget</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableData.map((order, i) => (
            <TableRow key={order.id}>

              {/* User */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={order.user.image}
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-slate-800">
                      {order.user.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.user.role}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Project */}
              <TableCell className="font-medium text-slate-700">
                {order.projectName}
              </TableCell>

              {/* Team */}
              <TableCell>
                <div className="flex -space-x-2">
                  {order.team.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className="w-7 h-7 rounded-full border border-white"
                    />
                  ))}
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    order.status === "Active"
                      ? "bg-green-50 text-green-600"
                      : order.status === "Pending"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>

              {/* Budget */}
              <TableCell className="font-medium text-slate-800">
                ${order.budget}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
}

