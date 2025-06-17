import { fileData } from "./Schema";
import FileItems from "./File";
const FileExplorer = () => {
  return (
    <>
      <h1>File Explorer</h1>
      {fileData.map((fileItem) => {
        return <FileItems key={fileItem.id} file={fileItem} />;
      })}
    </>
  );
};

export default FileExplorer;
