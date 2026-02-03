import type { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "@/collections/Pages/access/superAdminOrTenantAdmin";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    create: () => true,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: "customerName",
  },
  fields: [
    {
      name: "customerName",
      type: "text",
    },
    {
      name: "customerPhone",
      type: "text",
      unique: true,
    },
    {
      name: "reservationHistory",
      type: "join",
      collection: "reservations",
      on: "customer",
    },
    {
      name: "contactHistory",
      type: "join",
      collection: "contact-messages",
      on: "customer",
    },
  ],
};
