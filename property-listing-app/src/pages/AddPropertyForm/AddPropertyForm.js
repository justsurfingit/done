import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  InputNumber,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const AddPropertyForm = ({ darkMode }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/properties", values, {
        withCredentials: true,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding property:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <div style={{ padding: "40px" }}>
        <Card
          title={<Title level={3}>Add New Property</Title>}
          bordered={false}
          className="form-card"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              bedrooms: 1,
              bathrooms: 1,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Property Name"
                  rules={[
                    { required: true, message: "Please enter property name" },
                  ]}
                >
                  <Input placeholder="e.g. Luxury Villa" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true, message: "Please enter location" }]}
                >
                  <Input placeholder="e.g. New York" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="price"
                  label="Price ($/month)"
                  rules={[{ required: true, message: "Please enter price" }]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: "100%" }}
                    placeholder="e.g. 1500"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="bedrooms"
                  label="Bedrooms"
                  rules={[
                    {
                      required: true,
                      message: "Please enter number of bedrooms",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="bathrooms"
                  label="Bathrooms"
                  rules={[
                    {
                      required: true,
                      message: "Please enter number of bathrooms",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="image_url"
              label="Image URL"
              rules={[{ required: true, message: "Please enter image URL" }]}
            >
              <Input placeholder="e.g. https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" />
            </Form.Item>

            <Form.List name="features">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item
                        name={field.name}
                        label={`Feature ${index + 1}`}
                        rules={[
                          {
                            required: true,
                            message: "Please enter feature or remove it",
                          },
                        ]}
                      >
                        <Input placeholder="e.g. Swimming Pool" />
                      </Form.Item>
                      <Button
                        onClick={() => remove(field.name)}
                        style={{ marginBottom: "20px" }}
                      >
                        Remove Feature
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Feature
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Add Property
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddPropertyForm;
