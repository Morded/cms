export interface ICourse {
  index?: number;
  name: string;
  description: string;
  instructor: string;
}

export interface IPage {
  page: number;
  limit: number;
}

export interface IData {
  previous?: IPage;
  next?: IPage;
  pageCount: number;
  results: ICourse[];
}

export interface IEditCourse {
  index: number;
}
