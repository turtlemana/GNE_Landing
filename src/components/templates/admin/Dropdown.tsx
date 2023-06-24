
import {Dispatch, SetStateAction} from 'react'

interface Props {
    onSelect : Dispatch<SetStateAction<string>>
}

export default function Dropdown({ onSelect }:Props) {
    const boards = ['Board 1', 'Board 2', 'Board 3', 'Board 4'];
  
    return (
      <select 
      className="w-[150px] text-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"

      defaultValue={""} onChange={(e) => onSelect(e.target.value)}>
    <option disabled value="">{"선택"}</option>
    <option value="NEWS">{"보도자료"}</option>
    <option value="RECRUIT">{"채용공고"}</option>
    <option value="FAQ">{"자주묻는질문"}</option>
      </select>
    );
  }
  