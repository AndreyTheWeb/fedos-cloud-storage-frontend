import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName";
import { isImage } from "@/utils/isImage";
import { getColorByExtension } from "@/utils/getColorByExtension";
import { FileTextOutlined } from "@ant-design/icons";

import styles from "./FileCard.module.scss";

interface FileCardProps {
  fileName: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  originalName,
  fileName,
}) => {
  const ext = getExtensionFromFileName(fileName);
  const imageUrl =
    ext && isImage(ext) ? "http://localhost:7777/uploads/" + fileName : "";

  const color = getColorByExtension(ext);
  const classColor = styles[color];
  const transformedOriginalName =
    originalName.split(".")[0].length > 10
      ? `${originalName.substring(0, 10)}...${ext}`
      : originalName;

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          <img className={styles.image} src={imageUrl} alt="File" />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{transformedOriginalName}</span>
    </div>
  );
};
