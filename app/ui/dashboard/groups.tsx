'use client';
import { useState, useEffect } from 'react';
import { Profile } from '@/app/lib/definitions';
import { useActionState } from 'react';
import { createGroups, GroupsState } from '@/app/lib/actions';

interface GroupsProps {
  students: Profile[];
  assignmentId: string;
  periodId: string;
}

interface Group {
  name: string;
  students: Profile[];
}

export default function Groups({ students, assignmentId, periodId }: GroupsProps) {
  const [groupSize, setGroupSize] = useState(2);
  const [groups, setGroups] = useState<Group[]>([]);
  const [gridColumns, setGridColumns] = useState<string>('grid-cols-4');
  const [shouldSort, setShouldSort] = useState(false);
  const [groupNames, setGroupNames] = useState<string[]>([]);
  const initialState: GroupsState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createGroups, initialState);
  console.log(state);
  // Function to sort students into groups while complying with restrictions
  const sortStudentsIntoGroups = (profiles: Profile[], groupSize: number) => {
    const groups: Group[] = [];
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
      if (groupSize === 2 && groupCount === fullGroups) continue;
      const group: Group = {name: '', students: [student]};
      usedStudents.add(student.id);

      for (const otherStudent of activeStudents) {
        if (usedStudents.has(otherStudent.id)) continue;

        const restricted = restrictedMap.get(student.name)?.has(otherStudent.name) ||
                           restrictedMap.get(otherStudent.name)?.has(student.name);

        if (!restricted) {
          group.students.push(otherStudent);
          usedStudents.add(otherStudent.id);
          if (groupSize === 2 && groupCount === fullGroups - 1) continue;

          if (group.students.length >= groupSize || (group.students.length === groupSize - 1 && groupCount < groupsWithOneLess)) break;
        }
      }
      group.name = `Group ${groupCount + 1}`;
      groups.push(group);
      groupCount++;
    }
    // Handle remaining students
    const remainingStudents = activeStudents.filter(student => !usedStudents.has(student.id));
    for (const student of remainingStudents) {
      for (const group of groups) {
        if (group.students.length < groupSize || (group.students.length === groupSize && groupSize === 2)) {
          const restricted = group.students.some(groupMember =>
            restrictedMap.get(groupMember.name)?.has(student.name) ||
            restrictedMap.get(student.name)?.has(groupMember.name)
          );
          if (!restricted) {
            group.students.push(student);
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
    setGroupSize(2);
    setShouldSort(false);
    setGridColumns('grid-cols-4');
  };

  useEffect(() => {
    if (shouldSort && students) {
      const sortedGroups = sortStudentsIntoGroups(students, groupSize);
      setGroups(sortedGroups);
      setGroupNames(sortedGroups.map((_, index) => `Group ${index + 1}`));
      setGridColumns(`${groupSize === 2 ? 'grid-cols-5' : 'grid-cols-4'}`);
      setShouldSort(false);
    }
  }, [shouldSort, students, groupSize]);

  const handleGroupNameChange = (index: number, newName: string) => {
    const newGroupNames = [...groupNames];
    newGroupNames[index] = newName;
    setGroupNames(newGroupNames);
  };

  return (
    <form action={formAction}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <select
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="2">Pairs</option>
            <option value="3">Triplets</option>
            <option value="4">Quadruplets</option>
            <option value="5">Quintets</option>
            <option value="6">Sextets</option>
          </select>
          <button
            type="button"
            onClick={handleSort}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sort
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <div className={`grid gap-4 ${gridColumns}`}>
          {groups.map((group, index) => (
            <div key={index} className="relative rounded-lg bg-gray-50 p-4 shadow-md">
              <input
                type="text"
                value={groupNames[index]}
                onChange={(e) => handleGroupNameChange(index, e.target.value)}
                className="mb-2 text-lg font-semibold w-full border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {group.students.length}
              </div>
              <ul>
                {group.students.map(student => (
                  <li key={student.id} className="text-sm font-medium">
                    {student.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <input type="hidden" name="groups" value={JSON.stringify(groups)} />
        <input type="hidden" name="groupNames" value={groupNames} />
        <input type="hidden" name="assignmentId" value={assignmentId} />
        <input type="hidden" name="periodId" value={periodId} />
        <button
          type="submit"
          className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 self-start"
        >
          Save
        </button>
      </div>
    </form>
  );
}