import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, notification } from "antd";
import { useState } from "react";

import * as Api from "@/api";

import styles from "@/styles/Home.module.scss";

export const UploadButton: React.FC = () => {
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      await Api.files.uploadFile(options);

      setFileList([]);

      window.location.reload();
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Failed to upload file",
        duration: 2,
      });
    }
  };

  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Upload file
      </Button>
    </Upload>
  );
};
