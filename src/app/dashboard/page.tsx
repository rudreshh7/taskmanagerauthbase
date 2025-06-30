import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <DashboardLayout user={session.user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name || "User"}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your account today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$12,345</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Orders</h3>
            <p className="text-3xl font-bold text-orange-600">567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Growth</h3>
            <p className="text-3xl font-bold text-purple-600">+12%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Hello 1</h2>
          <p>
            This is the main dashboard content area. You can add charts, tables,
            and other components here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
