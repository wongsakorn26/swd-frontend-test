"use client"

import { useTranslation } from "@/app/i18n/client"
import { Row, Col, Button, Select, Form, Input, DatePicker, Radio } from "antd"
import type { FormProps } from "antd"
import { FormInput, userFormProps } from "@/types/form"
import "./form.scss"
import { useEffect } from "react"
import dayjs from "dayjs"

type Props = {
  params: { lng: string }
  formData?: userFormProps
  onSubmit: (values: userFormProps) => void
}
export default function FormComponent({ params, formData, onSubmit }: Props) {
  const { lng } = params
  const { t } = useTranslation(lng)
  const { Option } = Select
  const [form] = Form.useForm()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData,
        birthDay: formData.birthDay ? dayjs(formData.birthDay) : undefined,
      })
    }
  }, [formData, form])

  const handleFinish = (values: FormInput) => {
    onSubmit(values)
    form.resetFields()
  }

  const onFinishFailed: FormProps<FormInput>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo)
  }

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[
        {
          required: true,
          message: t("errorMessage.required", { name: t("phonePrefix") }),
        },
      ]}
    >
      <Select className="select-prefix">
        <Option value="66">+66</Option>
        <Option value="1">+1</Option>
        <Option value="33">+33</Option>
      </Select>
    </Form.Item>
  )

  return (
    <>
      <Form
        className="form-container"
        form={form}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "50%" }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="title"
              label={t("title")}
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", { name: t("title") }),
                },
              ]}
            >
              <Select placeholder={t("title")}>
                <Option value="mr">{t("mr")}</Option>
                <Option value="mrs">{t("mrs")}</Option>
                <Option value="ms">{t("ms")}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item<userFormProps>
              label={t("firstName")}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", {
                    name: t("firstName"),
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item<userFormProps>
              label={t("lastName")}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", {
                    name: t("lastName"),
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item<userFormProps>
              label={t("birthDay")}
              name="birthDay"
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", {
                    name: t("birthDay"),
                  }),
                },
              ]}
            >
              <DatePicker format={"MM/DD/YYYY"} placeholder={t("dateFormat")} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item<userFormProps>
              name="nationality"
              label={t("nationality")}
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", {
                    name: t("nationality"),
                  }),
                },
              ]}
            >
              <Select placeholder={t("pleaseSelect")}>
                <Option value="thai">{t("thai")}</Option>
                <Option value="french">{t("french")}</Option>
                <Option value="american">{t("american")}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item<userFormProps> label={t("citizenId")}>
              <Form.Item name="p1" noStyle>
                <Input maxLength={1} className="citizen-input" />
              </Form.Item>
              <span className="hyphen">-</span>

              <Form.Item name="p2" noStyle>
                <Input maxLength={4} className="citizen-input long" />
              </Form.Item>
              <span className="hyphen">-</span>

              <Form.Item name="p3" noStyle>
                <Input maxLength={5} className="citizen-input long" />
              </Form.Item>
              <span className="hyphen">-</span>

              <Form.Item name="p4" noStyle>
                <Input maxLength={2} className="citizen-input" />
              </Form.Item>
              <span className="hyphen">-</span>

              <Form.Item name="p5" noStyle>
                <Input maxLength={1} className="citizen-input" />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<userFormProps>
              label={t("gender")}
              name="gender"
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", { name: t("gender") }),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="genderMale">{t("genderMale")}</Radio>
                <Radio value="genderFemale">{t("genderFemale")}</Radio>
                <Radio value="genderUnsex">{t("genderUnsex")}</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="mobilePhone"
              label={t("mobilePhone")}
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", {
                    name: t("mobilePhone"),
                  }),
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item<userFormProps> name="passportNo" label={t("passportNo")}>
              <Input maxLength={13} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item<userFormProps>
              name="expectedSalary"
              label={t("expectedSalary")}
              rules={[
                {
                  required: true,
                  message: t("errorMessage.required", {
                    name: t("expectedSalary"),
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={4} sm={4}>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {t("reset")}
              </Button>
            </Form.Item>
          </Col>
          <Col xs={24} md={4} sm={4}>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {t("submit")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
