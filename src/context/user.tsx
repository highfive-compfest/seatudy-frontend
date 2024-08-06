'use client';
import { createContext, useContext, useState, Dispatch, SetStateAction} from 'react';

// interface userContextType {
//     isAnimate: any;
//     setAnimate: Dispatch<SetStateAction<boolean>>;
// }

const Context = createContext<any>({
    user : null,
    setUser : () => {}
});

export function UserContext({ children }:any) {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{user, setUser}}>
      {children}
    </Context.Provider>
  );
}

export function useUser() {
  return useContext(Context);
}