declare type PageDTO = PayloadDocument & {
  slug: string;
  title: string;
  category?: CategoryDTO;
  content?: Record<string, never>;
  html?: string;
  shownOnNavbar?: boolean;
  shownOnDrawer?: boolean;
  shownOnFooter?: boolean;
};
