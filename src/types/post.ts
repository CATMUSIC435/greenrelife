type IRendered = {
  rendered: string;
};

export type IOgImageInfo = {
  width: number;
  height: number;
  url: string;
  type: string;
};

type IOgImage = Array<IOgImageInfo>;

type IYoastHeadJson = {
  og_image: IOgImage;
  author: string;
};

export type IPost = {
  id: number;
  date: string;
  slug: string;
  title: IRendered;
  yoast_head_json: IYoastHeadJson;
};
