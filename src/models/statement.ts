export interface IStatement {
  id: string;
  statements: {
    courseID: string;
    [key: string]: any;
  };
}
