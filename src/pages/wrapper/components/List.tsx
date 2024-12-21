import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Album, User } from '../../../types';
import Loader from '../../../ui/Loader';
import { API } from '../../../api';

interface IListProps {
   endpoint: 'users' | 'albums';
}

const isUser = (item: User | Album): item is User => Object.prototype.hasOwnProperty.call(item, 'username');

const List: FC<IListProps> = ({ endpoint }) => {
   const { data, isLoading } = useQuery({
      queryKey: [endpoint],
      queryFn: () => API.get<User[] | Album[]>(endpoint),
      select: response => response.data
   });
   return (
      <>
         {isLoading ? (
            <Loader />
         ) : (
            <div className="flex flex-col">
               {data!.map(item => (
                  <NavLink key={item.id} to={`/${endpoint}/${item.id}`} className="hover:underline">
                     {isUser(item) ? item.name : item.title}
                  </NavLink>
               ))}
            </div>
         )}
      </>
   );
};

export default List;
