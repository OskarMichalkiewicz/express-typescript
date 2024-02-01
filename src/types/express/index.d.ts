declare namespace Express {
  interface Request {
    user: Record<string, string>;
    body: Record<string, string> & {
      createdBy: string;
    };
  }
}
