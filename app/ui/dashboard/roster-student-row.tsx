'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Profile } from '@/app/lib/definitions';
export default function RosterStudentRow({student, key}: {student: Profile, key: number}) {
  const [checked, setChecked] = useState(true);
  const [showRestricted, setShowRestricted] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);


  const handleChange = () => {
    const newChecked = !checked
    setChecked(newChecked);
  };

  const toggleRestricted = () => {
    setShowRestricted(!showRestricted);
  };

  const handleChipClick = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleDeleteSelected = () => {
    // const updatedRestrictedStudents = student.restricted_students.filter(
    //   restrictedStudent => !selectedChips.includes(restrictedStudent));
    // setRestrictedStudents(updatedRestrictedStudents);
    setSelectedChips([]);
  };
  return (
    <tr key={student.id} className={key % 2 === 0 ? 'bg-gray-50' : ''}>
      <td className="px-1 py-0.5 whitespace-nowrap text-right">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
        />
      </td>
      <td className={`px-2.5 py-4 whitespace-nowrap ${ !checked ? 'line-through' : ''} h-3`}>
        <div className="text-sm font-medium text-gray-900">{student.name.split(' ')[0]}</div>
      </td>
      <td className={`px-2 py-0.5 m-0 whitespace-nowrap h-2 ${!showRestricted ? 'align-top mt-1' : ''}`}>
        <div className="flex w-36 h-full">
            <div className="flex flex-wrap justify-start align-center h-2" >
                { showRestricted && 
                    student.restricted_students.map((restrictedStudent) => {
                    const [firstName, lastName] = restrictedStudent.split(' ');
                    const isSelected = selectedChips.includes(restrictedStudent);
                    const chipLabel = `${firstName.charAt(0)}${lastName.charAt(0)}`
                    return (
                        <span
                        key={student.studentId}
                        onClick={() => handleChipClick(restrictedStudent)}
                        className={`cursor-pointer bg-gray-200 text-gray-800 text-xs font-medium mr-1 mt-0.5 mb-0.5 px-2 py-0.5 rounded-xl ${
                            isSelected ? 'bg-blue-300' : ''
                        }`}
                        >
                        {chipLabel}
                        </span>
                    );
                    })
                }
          </div>
          <div className="flex flex-col justify-between items-end flex-grow h-full">
            <button
            onClick={toggleRestricted}
            className="text-blue-500 hover:text-blue-700 focus:outline-none flex items-center"
            >
              { showRestricted ? <EyeSlashIcon className="h-3 w-3" /> : <EyeIcon className="h-3 w-3" />}
            </button>
            { showRestricted && (
              <button
              onClick={handleDeleteSelected}
              className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}