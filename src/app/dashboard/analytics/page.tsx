import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <DashboardLayout user={session.user}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
          <p>This is the Analytics page content.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
