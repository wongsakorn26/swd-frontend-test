"use client"

import { Select } from "antd"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { languages } from "@/app/i18n/settings"
import { Row, Col } from "antd"

export default function SelectLangButton({
  currentLang,
}: {
  currentLang: string
}) {
  const [selectedLang, setSelectedLang] = useState(currentLang.toUpperCase())
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = (value: string) => {
    const newLang = value.toLowerCase()
    const segments = pathname.split("/")

    if (languages.includes(segments[1])) {
      segments[1] = newLang
    } else {
      segments.unshift("", newLang)
    }

    const newPath = segments.join("/")
    router.push(newPath)
  }

  const langOptionsEn = [
    { value: "EN", label: "EN" },
    { value: "TH", label: "TH" },
  ]
  const langOptionsTh = [
    { value: "EN", label: "อังกฤษ" },
    { value: "TH", label: "ไทย" },
  ]

  useEffect(() => {
    setSelectedLang(currentLang.toUpperCase())
  }, [currentLang])

  return (
    <Row justify="end" align="middle" style={{ width: "100%" }}>
      <Col>
        <Select
          value={selectedLang}
          onChange={handleChange}
          options={currentLang === "th" ? langOptionsTh : langOptionsEn}
          style={{ width: 100 }}
        />
      </Col>
    </Row>
  )
}
