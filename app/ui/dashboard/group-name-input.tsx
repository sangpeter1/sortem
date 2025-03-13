import { useState, useEffect } from 'react';
import { PencilSquareIcon, UsersIcon } from '@heroicons/react/24/solid';
import { Profile } from '@/app/lib/definitions';

interface SortedGroupProps {
  groups: Profile[][];
  gridColumns: string;
}

export default function SortedGroups({ groups, gridColumns } : SortedGroupProps) {
    const [groupNames, setGroupNames] = useState<string[]>((createdefaultGroupNames(groups)));

    function createdefaultGroupNames (groups: Profile[][]) {
        const defaultGroupNames = groups.map((_group, index) => `Group ${index + 1}`);
        return defaultGroupNames
    }
    const handleGroupNameChange = (index: number, newName: string) => {
        setGroupNames(prevGroupNames => {
            const updatedGroupNames = [...prevGroupNames];
            updatedGroupNames[index] = newName;
            return updatedGroupNames;
        });
    };

    useEffect(() => {
        setGroupNames(createdefaultGroupNames(groups));
    }, [groups])
  return (
    <div className={`grid gap-1 ${gridColumns}`}>
        {groups?.map((group, index) => (
          <div key={index} className="col-span-1 rounded-lg bg-gray-50 pt-4 pb-4 pr-2 pl-2 shadow-md">
            <div className='grid grid-cols-7 align-center'>
              <div className='relative col-span-6 max-w-full flex items-center bg-transparent'>
                <input
                  type="text"
                  value={`${groupNames[index]}`}
                  onChange={(e) => handleGroupNameChange(index, e.target.value)}
                  className="pl-0 pr-0 text-md font-medium border-none w-3/4 max-w-8/10 focus:outline-none}"
                />
                <PencilSquareIcon className="h-4 w-4 text-gray-400" />
              </div>              
              <div className="col-span-1 flex justify-center align-top">
                <span className="text-blue-500 font-medium text-xs mr-0.25 pt.025"> {2} </span>
                <UsersIcon className=" w-3 h-3 pt-0.5" /> 
              </div>
            </div>
            <div>
              <ul>
                {group.map(student => (
                  <li key={student.id} className="text-sm font-medium">
                    {student.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
        }
    </div>
  )
}

