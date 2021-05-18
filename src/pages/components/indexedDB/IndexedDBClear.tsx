import { Button, Form, Input } from 'antd';
import { indexedDBClear } from '@/utils/indexedDB';

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

export default function IndexedDBClear() {
  const onFinish = (values: any) => {
    const {
      dbName = 'indexdDB-db',
      storeName = 'indexdDB-store',
    } = values;
    indexedDBClear({
      dbName,
      storeName,
    }).then((e) => {
      console.log(e);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h1>IndexedDBClear</h1>
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
            <Input placeholder="indexdDB-store" />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">Delete</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
