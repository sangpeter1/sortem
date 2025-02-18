import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function SortemLogo() {
  return (
    <div
      className={`${lusitana.className} w-full flex flex-row items-center leading-none text-white`}
    >
      <PuzzlePieceIcon className="h-[48px] rotate-[20deg] pr-4" />
      <h1 className="text-[36px]">Sortem</h1>
    </div>
  );
}
