'use client';
import { useState, useEffect } from 'react';
import { Profile } from '@/app/lib/definitions';
import SortedGroups from '@/app/ui/dashboard/group-name-input'

export default function Groups({profiles}: {profiles: Profile[]}) {
  const [groupSize, setGroupSize] = useState(2);
  const [groups, setGroups] = useState<Profile[][]>([]);
  const [gridColumns, setGridColumns] = useState<string>('grid-cols-4');
  const [shouldSort, setShouldSort] = useState(false);

  // Function to sort students into groups while complying with restrictions
  const sortStudentsIntoGroups = (profiles: Profile[], groupSize: number) => {
    const groups: Profile[][] = [];
    const activeStudents = profiles.filter(student => student.status === 'active');
    const totalStudents = activeStudents.length;
    const remainder = totalStudents % groupSize;
    const fullGroups = Math.floor(totalStudents / groupSize);
    const groupsWithOneLess = remainder === 0 ? 0 : groupSize - remainder;
    let groupCount = 0;

    // Shuffle the active students to ensure randomization
    for (let i = activeStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [activeStudents[i], activeStudents[j]] = [activeStudents[j], activeStudents[i]];
    }

    const usedStudents = new Set<string>();

    // Create a map for quick lookup of restricted students
    const restrictedMap = new Map<string, Set<string>>();
    activeStudents.forEach(student => {
      restrictedMap.set(student.name, new Set(student.restricted_students));
    });

    for (const student of activeStudents) {
      if (usedStudents.has(student.id)) continue;
      if(groupSize === 2 && groupCount === fullGroups) continue;
      let group: Profile[] = [student];
      usedStudents.add(student.id);

      for (const otherStudent of activeStudents) {
        if (usedStudents.has(otherStudent.id)) continue;

        const restricted = restrictedMap.get(student.name)?.has(otherStudent.name) ||
                           restrictedMap.get(otherStudent.name)?.has(student.name);

        if (!restricted) {
          group.push(otherStudent);
          usedStudents.add(otherStudent.id);
          if (groupSize === 2 && groupCount === fullGroups - 1) continue

          if (group.length >= groupSize || (group.length === groupSize - 1 && groupCount < groupsWithOneLess)) break;
        }
      }

      groups.push(group);
      groupCount++;
    }

    // Handle remaining students
    const remainingStudents = activeStudents.filter(student => !usedStudents.has(student.id));
    for (const student of remainingStudents) {
      for (const group of groups) {
        if (group.length < groupSize || (group.length === groupSize && groupSize === 2)) {
          const restricted = group.some(groupMember =>
            restrictedMap.get(groupMember.name)?.has(student.name) ||
            restrictedMap.get(student.name)?.has(groupMember.name)
          );
          if (!restricted) {
            group.push(student);
            break;
          }
        }
      }
    }

    return groups;
  };

  const handleSort = () => {
    setShouldSort(true);
    setGridColumns(`${groupSize === 2 ? 'grid-cols-5' : 'grid-cols-4'}`);
  };

  const handleReset = () => {
    setGroups([]);
    setGroupSize(0);
    setShouldSort(false);
    setGridColumns('grid-cols-4');
  };

  useEffect(() => {
    if (shouldSort) {
      const sortedGroups = sortStudentsIntoGroups(profiles, groupSize);
      setGroups(sortedGroups);
      setGridColumns(`${groupSize === 2 ? 'grid-cols-5' : 'grid-cols-4'}`);
      setShouldSort(false);
    }
  }, [shouldSort, profiles, groupSize]);

  return (
    <div className={`flex-col pace-y-4`}>
      <div className="flex items-center space-x-4"> 
        <select
          value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
          className="form-select mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        > 
          <option value="2">Pairs</option>
          <option value="3">Triplets</option>
          <option value="4">Quadruplets</option>
          <option value="5">Quintets</option>
          <option value="6">Sextets</option>
        </select>
        <button
          onClick={handleSort}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Sort
        </button>
        <button
          onClick={handleReset}
          className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <SortedGroups groups={groups} gridColumns={gridColumns} />
      <button
        className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 self-start"
      >
        Save
      </button>
    </div>
  );
}