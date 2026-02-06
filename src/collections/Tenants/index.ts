import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
  EXPERIMENTAL_TableFeature,
} from "@payloadcms/richtext-lexical";
// import { YoutubeFeature } from "payloadcms-lexical-ext";

import { isSuperAdminAccess } from "@/access/isSuperAdmin";
import { updateAndDeleteAccess } from "./access/updateAndDelete";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: () => true,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "domain",
      type: "text",
      admin: {
        description: "Used for domain-based tenant handling",
      },
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Used for url paths, example: /tenant-slug/page-slug",
      },
      index: true,
      required: true,
    },
    {
      name: "aboutus",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,

            HeadingFeature({
              enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"],
            }),
            FixedToolbarFeature({}),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            LinkFeature(),
            EXPERIMENTAL_TableFeature(),

            // HighlightColorFeature(),

            // TextColorFeature({
            //   colors: [
            //     {
            //       type: 'button',
            //       label: 'Custom color',
            //       color: '#1155aa',
            //     },
            //   ],
            // }),
            // YoutubeFeature(),
            // HighlightColorFeature({
            //   colors: [
            //     {
            //       type: 'button',
            //       label: 'Custom color',
            //       color: '#1155aa',
            //     },
            //   ],
            // }),
          ];
        },
      }),
    },
    { name: "branchName", type: "text", required: true },
    { name: "menu", type: "upload", relationTo: "media", required: false },
    { name: "logo", type: "upload", relationTo: "media", required: false },
    { name: "address", type: "text", required: false },
    { name: "phone", type: "text", required: false },
    { name: "email", type: "text", required: false },
    { name: "heroTitle", type: "text", required: false },
    { name: "heroSubtitle", type: "text", required: false },
    { name: "heroDescription", type: "textarea", required: false },
    { name: "heroImage", type: "upload", relationTo: "media", required: false },
    { name: "shortAboutTitle", type: "text", required: false },
    { name: "shortAboutText", type: "text", required: false },
    {
      name: "newMenu",
      type: "array",

      fields: [
        { name: "src", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "allowPublicRead",
      type: "checkbox",
      admin: {
        description:
          "If checked, logging in is not required to read. Useful for building public pages.",
        position: "sidebar",
      },
      defaultValue: false,
      index: true,
    },
  ],
};
