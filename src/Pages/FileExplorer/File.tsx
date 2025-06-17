import { FileNode } from "./Schema";
import { useState } from "react";
import styles from "./file.module.css";
interface FileItemsProps {
  file: FileNode;
}

const FileItems = ({ file }: FileItemsProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className={styles.fileItem}>
      <div
        className={styles.fileButton}
        title={file.isFolder ? "Folder" : "File"}
      >
        <button
          onClick={() => setExpand((prevState) => !prevState)}
          className={styles.btn}
          data-folder={file.isFolder}
        >
          {file.isFolder ? (expand ? "📂" : "📁") : "📄"} {file.name}
        </button>
      </div>

      <div className={styles.files}>
        {file.isFolder &&
          !!file?.children?.length &&
          expand &&
          file?.children.map((fileItem) => {
            return <FileItems key={fileItem.id} file={fileItem} />;
          })}
      </div>
    </div>
  );
};

export default FileItems;
