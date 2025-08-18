import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

interface LicenseFileUploadProps {
  uploadList: UploadFile[];
  setUploadList: (files: UploadFile[]) => void;
}

const LicenseFileUpload: React.FC<LicenseFileUploadProps> = ({
  uploadList,
  setUploadList,
}) => {
  return (
    <Form.Item label="Upload New Files">
      <Upload
        beforeUpload={() => false}
        multiple
        fileList={uploadList}
        onChange={({ fileList }) => setUploadList(fileList)}
      >
        <Button icon={<UploadOutlined />}>Select file(s)</Button>
      </Upload>
    </Form.Item>
  );
};

export default LicenseFileUpload;
