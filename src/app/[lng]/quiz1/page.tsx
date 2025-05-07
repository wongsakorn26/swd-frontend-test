"use client";

import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { Row, Col, Button, Typography } from "antd";

import styles from "./quiz1.module.scss";

export default function Quiz1({ params }: { params: { lng: string } }) {
  const { lng } = params;
  const { t } = useTranslation(lng);

  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Typography.Title level={1}>{t("layoutStyle")}</Typography.Title>
        </Col>

        <Col>
          <Link href={`/${lng}/home`}>
            <Button type="primary">{t("Home")}</Button>
          </Link>
        </Col>
      </Row>

      <Row justify="center">
        <Col
          className={styles.container}
          onClick={() => {
            console.log("move Left");
          }}
        >
          <Col className={styles.triangle_left} />
        </Col>
        <Row
          justify="space-between"
          className={styles.groupContainer}
          onClick={() => {
            console.log("move Position");
          }}
        >
          <div className={styles.triangle_up} />
          <div className={styles.triangle_down} />
        </Row>
        <Col
          className={styles.container}
          onClick={() => {
            console.log("move Right");
          }}
        >
          <Col className={styles.triangle_right} />
        </Col>
      </Row>
    </>
  );
}
