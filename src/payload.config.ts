import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Tenants } from "./collections/Tenants";
import Users from "./collections/Users";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { isSuperAdmin } from "./access/isSuperAdmin";
import type { Config } from "./payload-types";
import { getUserTenantIDs } from "./utilities/getUserTenantIDs";
import { seed } from "./seed";
import { Reservations } from "./collections/Reservations";
import { ContactMessages } from "./collections/ContactMessages";

import { Customers } from "./collections/Customers";
import Media from "./collections/Media";
import HomeInforamtion from "./collections/HomeInformation";
import { Gallery } from "./collections/Gallery";
import { Settings } from "./globals/Settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    user: "users",
    components: {
      beforeDashboard: ["@/components/Dashboard/TodaysReservationsWidget"],
      graphics: {
        Logo: "@/graphics/Logo/index.tsx#Logos",
        Icon: "@/graphics/Logo/index.tsx#Logos",
      },
    },
    meta: {
      title: "Admin Panel",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.png",
        },
      ],
    },
  },
  collections: [
    Users,
    Tenants,
    Reservations,
    Customers,
    Media,
    ContactMessages,
    Gallery,
  ],
  globals: [HomeInforamtion, Settings],
  db: mongooseAdapter({
    url: process.env.DATABASE_URL as string,
  }),
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URL,
  //   },
  // }),
  onInit: async (args) => {
    if (process.env.SEED_DB) {
      await seed(args);
    }
  },
  editor: lexicalEditor({}),

  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) {
              return true;
            }
            return getUserTenantIDs(req.user).length > 0;
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],
});
