import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectField({ dataArr, title }: { dataArr: any, title: string }) {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {dataArr?.map((item: any, index: number) => (
            <SelectItem key={index} value={item[title.toLowerCase()]}>
              {item[title.toLowerCase()]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
