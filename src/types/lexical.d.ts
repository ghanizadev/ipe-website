declare type Document = Record<string, string | number | boolean | Document>;

declare type LexicalAnyNode =
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalLinkNode
  | LexicalLineBreakNode
  | LexicalTextNode
  | LexicalHorizontalRuleNode;

declare type LexicalRootNode = {
  children: LexicalAnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'root';
};

declare type LexicalParagraphNode = {
  children: LexicalAnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'paragraph';
  format: 'justify' | 'center' | 'left' | 'right';
  indent: number;
};

declare type LexicalHeadingNode = {
  children: LexicalAnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'heading';
  format: 'justify' | 'center' | 'left' | 'right';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

declare type LexicalLinkNode = {
  children: LexicalAnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'link';
  fields: {
    doc: {
      relationTo: string;
      value: Document;
    };
    linkType: 'custom' | 'internal';
    newTab: boolean;
    url: string;
  }[];
};

declare type LexicalTextNode = {
  children: AnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'text';
  text: string;
  style: string;
  mode: 'normal';
  detail: number;
  format: number;
};

declare type LexicalLineBreakNode = {
  type: 'linebreak';
  version: number;
};

declare type LexicalHorizontalRuleNode = {
  type: 'horizontalrule';
  version: number;
};

declare type LexicalNodes = {
  root: LexicalRootNode;
};
