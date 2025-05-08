"use client"

import Link from "next/link"
import { useTranslation } from "@/app/i18n/client"
import { Card, Row, Col } from "antd"

export default function Homepage({ params }: { params: { lng: string } }) {
  const { lng } = params
  const { t } = useTranslation(lng)

  return (
    <Row gutter={16} justify={"center"}>
      <Col span={8}>
        <Link href={`/${lng}/quiz1`}>
          <Card title={t("test1")} variant="borderless">
            <h4 style={{ caretColor: "transparent" }}>{t("layoutStyle")}</h4>
          </Card>
        </Link>
      </Col>
      <Col span={8}>
        <Link href={`/${lng}/quiz2`}>
          <Card title={t("test2")} variant="borderless">
            <h4 style={{ caretColor: "transparent" }}>{t("formManagement")}</h4>
          </Card>
        </Link>
      </Col>
    </Row>
  )
}
