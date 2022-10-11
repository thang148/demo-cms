import React, { useRef } from "react"
import { Select, Input } from "antd"

const { Option } = Select

const STATUS_CHANNEL = [
  { value: true, name: "Hoạt động" },
  { value: false, name: "Không hoạt động" }
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
  const { name, status } = filter
  return (
    <div className="flex justify-end space-x-4">
      <Input
        defaultValue={name}
        className="w-200"
        placeholder="Tên giải đấu..."
        onChange={(e) => onChangeFilter("name", e.target.value)}
      />

      <Select
        placeholder="Chọn trạng thái"
        allowClear
        className="w-200"
        style={{ minWidth: "200px" }}
        value={status}
        onChange={(v) => onChangeFilter("is_active", v)}
      >
        {STATUS_CHANNEL.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}
