"use client"

import Link from "next/link"
import { useTranslation } from "@/app/i18n/client"
import { Row, Col, Button, Typography, Divider } from "antd"
import { useState } from "react"
import styles from "./quiz1.module.scss"

export default function Quiz1({ params }: { params: { lng: string } }) {
  const { lng } = params
  const { t } = useTranslation(lng)
  const shapeNames = [
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]

  const [selectedShape, setSelectedShape] = useState(
    shapeNames.map((name) => ({ name, className: styles[name] }))
  )

  const handleLeftMove = () => {
    const first = selectedShape[0]
    const rest = selectedShape.slice(1)
    setSelectedShape([...rest, first])
  }

  const handleRightMove = () => {
    const last = selectedShape[selectedShape.length - 1]
    const rest = selectedShape.slice(0, -1)
    setSelectedShape([last, ...rest])
  }

  const handleHalfMove = () => {
    const half = Math.ceil(selectedShape.length / 2)
    const firstHalf = selectedShape.slice(0, half)
    const secondHalf = selectedShape.slice(half)
    setSelectedShape([...secondHalf, ...firstHalf])
  }

  const handleRandomMove = () => {
    setSelectedShape([...selectedShape].sort(() => Math.random() - 0.5))
  }

  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Typography.Title level={1}>{t("layoutStyle")}</Typography.Title>
        </Col>

        <Col>
          <Link href={`/${lng}/home`}>
            <Button>{t("home")}</Button>
          </Link>
        </Col>
      </Row>

      <Row justify="center">
        <Col
          className={styles.container}
          onClick={() => {
            handleLeftMove()
          }}
        >
          <Col className={styles.triangle_left}>
            <div className={styles.chipRight}>{t("moveShape")}</div>
          </Col>
        </Col>
        <Row
          justify="space-between"
          className={styles.groupContainer}
          onClick={() => {
            handleHalfMove()
          }}
        >
          <Col className={styles.triangle_up} />
          <Col className={styles.triangle_down} />
          <p className={styles.chipCenter}>{t("movePosition")}</p>
        </Row>
        <Col
          className={styles.container}
          onClick={() => {
            handleRightMove()
          }}
        >
          <Col className={styles.triangle_right}>
            <div className={styles.chipLeft}>{t("moveShape")}</div>
          </Col>
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        {...selectedShape.slice(0, 3).map((item, index) => (
          <Col
            key={index}
            className={styles.container}
            onClick={() => {
              handleRandomMove()
            }}
          >
            <Col className={item?.className} />
          </Col>
        ))}
      </Row>
      <Row justify="center">
        {...selectedShape.slice(3, 7).map((item, index) => (
          <Col
            key={index}
            className={styles.container}
            onClick={() => {
              handleRandomMove()
            }}
          >
            <Col className={item?.className} />
          </Col>
        ))}
      </Row>
    </>
  )
}
