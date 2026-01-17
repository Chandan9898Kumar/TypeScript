import { useState } from "react";
import { fileData, FileNode } from "./Schema";
import { addChildToFolder, deleteItemFromFolder } from "./Utils";

import FileItems from "./FileItems";

const CrudFileExplorer = () => {
  const [files, setFiles] = useState<FileNode[]>(fileData);

  const handleSetFileType = (element: FileNode, id: number | string) => {
    setFiles((prevItem) => addChildToFolder(prevItem, element, id));
  };

  const handleDeleteItem = (id: number | string) => {
    setFiles((prevItem) =>
      deleteItemFromFolder(JSON.parse(JSON.stringify(prevItem)), id),
    );
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
            handleDeleteItem={handleDeleteItem}
          />
        );
      })}
    </>
  );
};

export default CrudFileExplorer;
