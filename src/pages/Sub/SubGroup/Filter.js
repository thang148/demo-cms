import React, { useRef } from "react"
import { Select, Input } from "antd"

const { Option } = Select

const STATUS_USER = [
  { value: true, name: "Hoạt động" },
  { value: false, name: "Tạm dừng" }
]

export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    __filter.current[key] = value
    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { search, is_active } = filter
  return (
    <div className="flex gap-2">
      <Input
        defaultValue={search}
        className="w-200"
        placeholder="Nhập tìm kiếm..."
        onChange={(e) => onChangeFilter("search", e.target.value)}
      />

      <Select
        placeholder="Chọn trạng thái"
        className="w-200"
        value={JSON.parse(is_active)}
        onChange={(v) => onChangeFilter("is_active", v)}
      >
        {STATUS_USER.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}
