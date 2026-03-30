import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SubcategoryDB {
  id: string;
  slug: string;
  category_id: string;
  name: string;
  name_en: string | null;
  icon: string | null;
  description: string | null;
  description_en: string | null;
  hero_description: string | null;
  hero_description_en: string | null;
  featured_image: string | null;
  sort_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryDB {
  id: string;
  slug: string;
  name: string;
  name_en: string | null;
  icon: string | null;
  description: string | null;
  description_en: string | null;
  hero_headline: string | null;
  hero_headline_en: string | null;
  hero_description: string | null;
  hero_description_en: string | null;
  experience_category_key: string;
  featured_image: string | null;
  faq_cultural: { question: string; answer: string }[];
  faq_tips: { question: string; answer: string }[];
  sort_order: number;
  status: string;
  created_at: string;
  updated_at: string;
  subcategories: SubcategoryDB[];
}

// Adapts DB shape to the legacy Category interface used by pages
export interface CategoryLegacy {
  slug: string;
  name: string;
  icon: string;
  description: string;
  heroHeadline: string;
  heroDescription: string;
  experienceCategory: string;
  faqCultural: { question: string; answer: string }[];
  faqTips: { question: string; answer: string }[];
  subcategories: SubcategoryLegacy[];
}

export interface SubcategoryLegacy {
  slug: string;
  name: string;
  icon: string;
  description: string;
  heroDescription: string;
}

function toLegacyCategory(cat: CategoryDB): CategoryLegacy {
  return {
    slug: cat.slug,
    name: cat.name,
    icon: cat.icon || "",
    description: cat.description || "",
    heroHeadline: cat.hero_headline || cat.name,
    heroDescription: cat.hero_description || "",
    experienceCategory: cat.experience_category_key,
    faqCultural: Array.isArray(cat.faq_cultural) ? cat.faq_cultural : [],
    faqTips: Array.isArray(cat.faq_tips) ? cat.faq_tips : [],
    subcategories: (cat.subcategories || []).map((s) => ({
      slug: s.slug,
      name: s.name,
      icon: s.icon || "",
      description: s.description || "",
      heroDescription: s.hero_description || "",
    })),
  };
}

export function useExperienceCategories() {
  return useQuery({
    queryKey: ["experience-categories"],
    queryFn: async (): Promise<CategoryLegacy[]> => {
      const { data: cats, error: catsError } = await supabase
        .from("experience_categories")
        .select("*")
        .eq("status", "published")
        .order("sort_order");

      if (catsError) throw catsError;

      const { data: subs, error: subsError } = await supabase
        .from("experience_subcategories")
        .select("*")
        .eq("status", "published")
        .order("sort_order");

      if (subsError) throw subsError;

      const categoriesWithSubs = (cats || []).map((cat) => ({
        ...cat,
        faq_cultural: cat.faq_cultural as { question: string; answer: string }[],
        faq_tips: cat.faq_tips as { question: string; answer: string }[],
        subcategories: (subs || []).filter((s) => s.category_id === cat.id) as SubcategoryDB[],
      }));

      return categoriesWithSubs.map(toLegacyCategory);
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}

export function useCategoryBySlug(slug: string | undefined) {
  const { data: categories, isLoading, error } = useExperienceCategories();
  const category = categories?.find((c) => c.slug === slug) || null;
  return { category, isLoading, error };
}

export function useSubcategoryBySlug(
  categorySlug: string | undefined,
  subcategorySlug: string | undefined
) {
  const { category, isLoading, error } = useCategoryBySlug(categorySlug);
  const subcategory =
    category?.subcategories.find((s) => s.slug === subcategorySlug) || null;
  return { category, subcategory, isLoading, error };
}
