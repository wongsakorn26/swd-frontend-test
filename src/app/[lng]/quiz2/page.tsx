"use client"

import Link from "next/link"
import { useTranslation } from "@/app/i18n/client"
import { Row, Col, Button, Typography } from "antd"

import "./quiz2.scss"

export default function Quiz2({ params }: { params: { lng: string } }) {
  const { lng } = params
  const { t } = useTranslation(lng)

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

      <Row justify="center" className="home-page-container">
        <Col>quiz2</Col>
      </Row>
    </>
  )
}
