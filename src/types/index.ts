import { ReactNode, Dispatch, SetStateAction } from 'react';
import { UIMatch } from 'react-router-dom';

export type User = {
   id: number;
   name: string;
   username: string;
   email: string;
   address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: { lat: string; lng: string };
   };
   phone: string;
   website: string;
   company: {
      name: string;
      catchPhrase: string;
      bs: string;
   };
};

export type Album = { userId: number; id: number; title: string };
export type Photo = {
   albumId: number;
   id: number;
   title: string;
   url: string;
   thumbnailUrl: string;
};

export type AppContextType = {
   users: User[];
   isUsersFetched: boolean;
   setUsers: Dispatch<SetStateAction<User[]>>;
   setIsUsersFetched: Dispatch<SetStateAction<boolean>>;
   albums: Album[];
   isAlbumsFetched: boolean;
   setAlbums: Dispatch<SetStateAction<Album[]>>;
   setIsAlbumsFetched: Dispatch<SetStateAction<boolean>>;
   photos: Photo[];
   setPhotos: Dispatch<SetStateAction<Photo[]>>;
};

// eslint-disable-next-line no-unused-vars
export type BreadcrumbMatch = UIMatch<unknown, { crumb?: (_: unknown) => ReactNode }>;
