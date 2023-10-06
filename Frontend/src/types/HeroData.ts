type SlideshowType = {
    data: any;
}
export type HeroData= {
    id: number;
    Title: string;
    Annotation: string;
    Slideshow: {
      data: SlideshowType[];
    };
}