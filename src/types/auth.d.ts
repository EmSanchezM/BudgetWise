import "@auth/core/types";
import "@auth/core/jwt";
import "@auth/core/adapters";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: string;
  }

  interface User {
    firstName: string;
    lastName: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    firstName: string;
    lastName: string;
  }
}
