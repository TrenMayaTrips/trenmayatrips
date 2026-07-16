import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listDestinations from "./tools/list-destinations";
import listPackages from "./tools/list-packages";
import listRoutes from "./tools/list-routes";
import listExperiences from "./tools/list-experiences";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "tren-maya-trips-mcp",
  title: "Tren Maya Trips",
  version: "0.1.0",
  instructions:
    "Read-only tools for the Tren Maya Trips travel site. Browse published blog posts, destinations, train routes, travel packages, and experiences along the Tren Maya.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listBlogPosts, getBlogPost, listDestinations, listPackages, listRoutes, listExperiences],
});