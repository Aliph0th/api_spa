import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';
import { API } from '../api';
import { QUERY_KEYS } from '../constants';
import { Album, User as UserType } from '../types';
import Loader from '../ui/Loader';

const User = () => {
   const { userID } = useParams();

   const { data: user, isLoading: isUserLoading } = useQuery({
      queryKey: [QUERY_KEYS.USER_ID, userID],
      queryFn: () => API.get<UserType[]>(`/users?id=${userID}`),
      select: response => response.data[0],
      enabled: !!userID
   });
   const { data: albums, isLoading: isAlbumsLoading } = useQuery({
      queryKey: [QUERY_KEYS.ALBUM_USER_ID, userID],
      queryFn: () => API.get<Album[]>(`/albums?userId=${userID}`),
      select: response => response.data,
      enabled: !!user?.id
   });

   if (isUserLoading || isAlbumsLoading) {
      return <Loader />;
   }

   return (
      <>
         {!user ? (
            <span className="text-gray-400 text-lg">User #{userID} not found</span>
         ) : (
            <div>
               <h1 className="font-bold text-3xl inline">{user.name}</h1>
               <span className="text-gray-400 text-xl ml-2">
                  (<i>@{user.username}</i>)
               </span>
               <p className="text-sm">
                  <a
                     href={`mailto:${user.email}`}
                     className="text-gray-600 hover:text-blue-700 underline decoration-dashed"
                  >
                     {user.email}
                  </a>
               </p>
               <p className="text-sm">
                  <a
                     href={`tel:${user.phone}`}
                     className="text-gray-600 hover:text-blue-700 underline decoration-dashed"
                  >
                     {user.phone}
                  </a>
               </p>
               <p className="text-sm">
                  <a href={`tel:${user.website}`} className="text-gray-600 hover:text-blue-700 underline">
                     {user.website}
                  </a>
               </p>
            </div>
         )}
         <p className="font-bold text-lg mt-9">Albums</p>
         <div className="flex flex-col">
            {!albums?.length ? (
               <span className="text-gray-400 text-sm">Albums for user #{userID} not found</span>
            ) : (
               <>
                  {albums.map(album => (
                     <NavLink key={album.id} to={`/albums/${album.id}`} className="hover:underline">
                        {album.title}
                     </NavLink>
                  ))}
               </>
            )}
         </div>
      </>
   );
};

export default User;
