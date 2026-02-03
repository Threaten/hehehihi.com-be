import type { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "@/collections/Pages/access/superAdminOrTenantAdmin";

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  access: {
    create: () => true,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: "customer",
  },
  fields: [
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
    },

    {
      name: "message",
      type: "textarea",
      required: false,
    },
    {
      name: "branch",
      type: "relationship",
      relationTo: "tenants",
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: ["Pending", "Confirmed", "Cancelled"],
      defaultValue: "Pending",
      required: true,
    },
  ],
};
