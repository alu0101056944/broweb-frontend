export interface PageInfo {
  pageName: string;
  pageTitle: string;
  pageType: 'videoGridPage' | 'blockPage';
  content: { textpageContent: any[]; };
  mediaItems: any[];
  pageDescription: string;
}
