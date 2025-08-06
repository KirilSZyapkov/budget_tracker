import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SelectField({ dataArr, title, onChangeHandler }: { dataArr: any[], title: string, onChangeHandler: (value: string) => void }) {
  return (
    <Select>
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
