"use client"

import { useTranslation } from "@/app/i18n/client"
import { useEffect, useState } from "react"
import {
  Table,
  Button,
  Space,
  Row,
  Col,
  Typography,
  TableProps,
  Checkbox,
  CheckboxChangeEvent,
} from "antd"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { addForm, updateForm } from "@/redux/formSlice"
import { userFormProps } from "@/types/form"
import FormComponent from "@/components/form-components"
import Link from "next/link"
import { deleteForm } from "@/redux/formSlice"

export default function Quiz2({ params }: { params: { lng: string } }) {
  const { lng } = params
  const { t } = useTranslation(lng)
  const dispatch = useDispatch()
  const formList = useSelector((state: RootState) => state.form)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDelete = () => {
    selectedRowKeys.forEach((key) => dispatch(deleteForm(Number(key))))
    setSelectedRowKeys([])
  }

  const handleDeleteRow = (index: number) => {
    dispatch(deleteForm(index))
    setSelectedRowKeys((prev) => prev.filter((key) => Number(key) !== index))
    alert(t("deleteSuccess"))
  }

  const columns: TableProps<userFormProps & { key: number }>["columns"] = [
    {
      title: t("table.name"),
      render: (record: userFormProps) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: t("table.gender"),
      render: (record: userFormProps) => t(`${record.gender}`),
    },
    {
      title: t("table.mobilePhone"),
      render: (record: userFormProps) =>
        `${record.prefix}${record.mobilePhone.slice(1)}`,
    },
    {
      title: t("table.nationality"),
      render: (record: userFormProps) => t(`${record.nationality}`),
    },
    {
      title: t("table.manage"),
      render: (_: unknown, record: userFormProps, index: number) => (
        <Space>
          <Button danger onClick={() => handleDeleteRow(index)}>
            {t("delete")}
          </Button>

          <Button onClick={() => setEditIndex(index)}>{t("edit")}</Button>
        </Space>
      ),
    },
  ]

  const handleSubmit = (values: userFormProps) => {
    if (editIndex !== null) {
      dispatch(updateForm({ index: editIndex, updated: values }))
    } else {
      dispatch(addForm(values))
    }
    setEditIndex(null)
  }

  const dataSource = formList.map((item, i) => ({
    ...item,
    key: i,
  }))

  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKeys = dataSource.map((item) => item.key)
      setSelectedRowKeys(allKeys)
    } else {
      setSelectedRowKeys([])
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Typography.Title level={1}>{t("formManagement")}</Typography.Title>
        </Col>
        <Col>
          <Link href={`/${lng}/home`}>
            <Button>{t("home")}</Button>
          </Link>
        </Col>
      </Row>

      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <FormComponent
          params={{ lng }}
          formData={editIndex !== null ? formList[editIndex] : undefined}
          onSubmit={handleSubmit}
        />
        <Col style={{ width: "100%", maxWidth: "1000px" }}>
          {isClient && (
            <Table<userFormProps & { key: number }>
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 2, position: ["topRight"] }}
              title={() => (
                <Row align="middle" style={{ width: "100%" }}>
                  <Col span={4}>
                    <Checkbox
                      checked={
                        selectedRowKeys.length > 0 &&
                        selectedRowKeys.length === dataSource.length
                      }
                      onChange={handleSelectAllChange}
                    >
                      {t("selectAll")}
                    </Checkbox>
                  </Col>

                  <Col span={4}>
                    <Button danger onClick={handleDelete}>
                      {t("delete")}
                    </Button>
                  </Col>
                </Row>
              )}
            />
          )}
        </Col>
      </Row>
    </>
  )
}
