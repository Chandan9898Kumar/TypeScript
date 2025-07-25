export default interface Tree {
  id: string;
  label: string;
  checked: boolean;
  children: Tree[];
}
