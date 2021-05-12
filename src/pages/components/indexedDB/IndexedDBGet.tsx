import { useState } from 'react';
import { Button, Form, Input, Row, Col, Card, Descriptions } from 'antd';
import { indexedDBGet } from '@/utils/indexedDB'

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

export default function IndexedDBGet() {
  const [idbKey, setIdbKey] = useState<string | undefined>(undefined);
  const [idbValue, setIdbValue] = useState<string>('');
  const onFinish = (values: any) => {
    const {
      dbName = 'indexdDB-db',
      storeName = 'indexdDB-store',
      key,
    } = values;
    indexedDBGet({
      dbName,
      storeName,
      key,
    }).then((e) => {
      console.log(e);
      setIdbValue(String(e || ''));
    });
    setIdbKey(key);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const renderResult = () => {
    return (
      <Card style={{ width: 600 }}>
        <Descriptions title="get结果">
          <Descriptions.Item label={idbKey}>{idbValue}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }

  return (
    <div style={{ margin: '20px 0px' }}>
      <h1>IndexedDBGet</h1>
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
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">Get</Button>
          </Form.Item>
        </Form>
      </div>
      {renderResult()}
    </div>
  );
}
