import { Button, Form, Input } from 'antd';
import { indexedDBSet } from '@/utils/indexedDB'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

export default function IndexedDBSet() {
  const onFinish = (values: any) => {
    const {
      dbName = 'indexdDB-db',
      storeName = 'indexdDB-store',
      key,
      value
    } = values;
    indexedDBSet({
      dbName,
      storeName,
      key,
      value
    });
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ margin: '20px 0px' }}>
      <h1>IndexedDBSet</h1>
      <div>
        <Form
          style={{ maxWidth: 600 }}
          {...formItemLayout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="数据库名称"
            name="dbName"
          >
            <Input placeholder="indexdDB-db" />
          </Form.Item>
          <Form.Item
            label="表"
            name="storeName"
          >
            <Input placeholder="indexdDB-db" />
          </Form.Item>
          <Form.Item
            label="key"
            name="key"
            rules={[{ required: true, message: 'Please input key!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="value"
            name="value"
            rules={[{ required: true, message: 'Please input value!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">Set</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
