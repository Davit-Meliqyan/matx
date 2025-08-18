import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Step2Data } from "./types";

interface Step2UploadProps {
  onFinish: (values: Step2Data) => void;
  onSkip: () => void;
}

const Step2Upload: React.FC<Step2UploadProps> = ({ onFinish, onSkip }) => {
  return (
    <Form<Step2Data> layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Files"
        name="fileURLs"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload beforeUpload={() => false} multiple>
          <Button icon={<UploadOutlined />}>Select file(s)</Button>
        </Upload>
      </Form.Item>

      <div className="flex gap-2 mt-4">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button type="dashed" onClick={onSkip}>
          Skip
        </Button>
      </div>
    </Form>
  );
};

export default Step2Upload;
