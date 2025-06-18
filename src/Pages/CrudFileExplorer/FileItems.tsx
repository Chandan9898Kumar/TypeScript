import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { FileNode } from "./Schema";
import styles from "./crud.module.css";

interface FileItems {
  file: FileNode;
  handleSetFileType: (element: FileNode, id: number | string) => void;
}

const FileItems = ({ file, handleSetFileType }: FileItems) => {
  const [expand, setExpand] = useState(false);
  const [fileType, setFileType] = useState("");

  return (
    <div className={styles.fileItem}>
      <div
        className={styles.fileButton}
        title={file.isFolder ? "Folder" : "File"}
      >
        <button
          title={expand ? "Collapse" : "Expand"}
          onClick={() => setExpand((prevState) => !prevState)}
          className={styles.btn}
          data-folder={file.isFolder}
        >
          {file.isFolder ? (expand ? "📂" : "📁") : "📄"} {file.name}
        </button>

        {file.isFolder && <Button setFileType={setFileType} />}
      </div>

      {fileType && (
        <Input
          folderId={file.id}
          fileType={fileType}
          setFileType={setFileType}
          handleSetFileType={handleSetFileType}
        />
      )}

      <div className={styles.files}>
        {file.isFolder &&
          !!file?.children?.length &&
          expand &&
          file?.children.map((fileItem) => {
            return (
              <FileItems
                key={fileItem.id}
                file={fileItem}
                handleSetFileType={handleSetFileType}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FileItems;
