import { useState } from "react";
import { fileData, FileNode } from "./Schema";
import { addChildToFolder } from "./Utils";

import FileItems from "./FileItems";

const CrudFileExplorer = () => {
  const [files, setFiles] = useState<FileNode[]>(fileData);

  const handleSetFileType = (element: FileNode, id: number | string) => {
    setFiles((prevItem) => addChildToFolder(prevItem, element, id));
  };

  return (
    <>
      <h1>Crud File Explorer</h1>
      {files.map((fileItem) => {
        return (
          <FileItems
            key={fileItem.id}
            file={fileItem}
            handleSetFileType={handleSetFileType}
          />
        );
      })}
    </>
  );
};

export default CrudFileExplorer;
