/*
Future Implementation Note for AI Feature:

The <AI> provider, which enables streamable AI-generated content, was originally wrapping this layout.
However, it was moved to resolve a critical conflict between Server-Only components (like the AI provider)
and Client Components (now required by this layout for the interactive mobile sidebar).

To re-integrate the AI functionality (e.g., for generating car details from an image on the `/admin/cars/new` page)
without breaking the main admin layout, the following architecture should be implemented:

1.  Keep this main admin layout as a Client Component (`'use client'`) to manage the sidebar state.
2.  Create a new, specific layout file for the page that will use the AI feature, for example: `src/app/admin/cars/new/layout.tsx`.
3.  This new layout file will be a Server Component.
4.  Wrap the `children` of this new layout with the `<AI>` provider.

This approach isolates the server-only AI context to only the route that needs it, allowing the rest of the admin panel to function correctly with client-side interactivity.
*/
'use client';
import AdminHeader from "@/components/layouts/admin-header";
import AdminSidebar from "@/components/layouts/admin-sidebar";
import React, { PropsWithChildren, useState } from "react";

// The AI provider has been removed from this layout to resolve the
// "Could not find the module" error related to server-only components.
// The AdminLayout now directly manages the state for the sidebar.

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-900 text-gray-300 min-h-screen w-full">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main
          className="admin-scrollbar flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;