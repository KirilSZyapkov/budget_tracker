import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { budgets } from "@/drizzle/schemas/budgets";
import { months } from "@/drizzle/schemas/months";

type Budget = typeof budgets.$inferSelect;
type Month = typeof months.$inferSelect;

type Props = { 
  dataArr: Budget[] | Month[], 
  title: string, 
  onChange: (e:any, title: string) => void,
}


export default function SelectField({ dataArr, title, onChange }: Props) {
  return (
    <Select onValueChange={(e)=>onChange(e, title)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {dataArr.length > 0 && dataArr?.map((item: any, index: number) => (
            <SelectItem key={index} value={item[title.toLowerCase()]}>
              {item[title.toLowerCase()]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
