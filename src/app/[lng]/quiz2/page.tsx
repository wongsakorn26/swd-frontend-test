"use client"

import Link from "next/link"
import { useTranslation } from "@/app/i18n/client"
import { Row, Col, Button, Typography } from "antd"
import { useState } from "react"
import { userData } from "@/types/form"
import FormComponent from "@/components/form-components"
import TableComponents from "@/components/table-components"

export default function Quiz2({ params }: { params: { lng: string } }) {
  const { lng } = params
  const { t } = useTranslation(lng)
  const [formData, setFormData] = useState<userData>()
  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Typography.Title level={1}>{t("formManangement")}</Typography.Title>
        </Col>

        <Col>
          <Link href={`/${lng}/home`}>
            <Button type="primary">{t("home")}</Button>
          </Link>
        </Col>
      </Row>
      <Row
        justify="center"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <FormComponent
          formData={formData}
          setFormData={setFormData}
          params={{ lng }}
        />
        <TableComponents />
      </Row>
    </>
  )
}
