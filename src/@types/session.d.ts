import 'next-auth';

declare module 'next-auth' {
  export interface DefaultSession {
    userId?: string;
  }
}
