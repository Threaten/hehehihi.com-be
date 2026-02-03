import type { CollectionConfig } from "payload";

import { superAdminOrTenantAdminAccess } from "@/collections/Pages/access/superAdminOrTenantAdmin";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  access: {
    create: () => true,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: "image",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "caption",
      type: "text",
      required: false,
    },
    {
      name: "branch",
      type: "relationship",
      relationTo: "tenants",
    },
  ],
};
