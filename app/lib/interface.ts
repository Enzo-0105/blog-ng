export interface Posts {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  postImage: any;
  body: any;
  tags: Array<Tag>;
  authors: Array<Author>;
  _id: string;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}

export interface Author {
  name: string;
  image: any;
  _id: string;
}
