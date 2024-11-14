declare type Document = Record<string, string | number | boolean | Document>;

declare type AnyNode =
  | ParagraphNode
  | HeadingNode
  | LinkNode
  | Heading
  | LineBreakNode
  | HorizontalRuleNode;

declare type RootNode = {
  children: AnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'root';
};

declare type ParagraphNode = {
  children: AnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'paragraph';
  format: 'justify' | 'center' | 'left' | 'right';
  indent: number;
};

declare type HeadingNode = {
  children: AnyNode[];
  direction: 'ltr' | 'rtl';
  version: number;
  type: 'heading';
  format: 'justify' | 'center' | 'left' | 'right';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

declare type LinkNode = {
  children: AnyNode[];
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

declare type Heading = {
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

declare type LineBreakNode = {
  type: 'linebreak';
  version: number;
};

declare type HorizontalRuleNode = {
  type: 'horizontalrule';
  version: number;
};

declare type LexicalNodes = {
  root: RootNode;
};
