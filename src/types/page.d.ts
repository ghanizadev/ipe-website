declare type PageDTO = PayloadDocument & {
  slug: string;
  title: string;
  category?: CategoryDTO;
  content?: LexicalNodes;
  html?: string;
  shownOnNavbar?: boolean;
  shownOnDrawer?: boolean;
  shownOnFooter?: boolean;
};
