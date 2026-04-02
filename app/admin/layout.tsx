import { AdminProvider } from "../../context/AdminContext";
import AdminLayoutWrapper from "../../components/admin/AdminLayoutWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </AdminProvider>
  );
}