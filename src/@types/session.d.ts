import 'next-auth';

type SessionExtend = {
  accessToken: string;
};

declare module 'next-auth' {
  export interface Session extends SessionExtend,
}