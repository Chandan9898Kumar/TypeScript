import Tree from "./Schema";
import styles from "./check.module.css";
interface RenderProps {
  node: Tree;
  handleCheck: (id: string, check: boolean) => void;
  expanded: Record<string, boolean>;
  handleExpand: (id: string) => void;
}

const RenderNodes = ({
  node,
  handleCheck,
  expanded,
  handleExpand,
}: RenderProps) => {
  const isExpanded = expanded[node.id];

  return (
    <div className={styles.renderTree}>
      <label>
        {!!node.children.length && (
          <button
            className={styles.collaspButton}
            aria-label="collapse-button"
            onClick={() => {
              handleExpand(node.id);
            }}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}

        <input
          type="checkbox"
          checked={node.checked}
          onChange={(event) => {
            handleCheck(node.id, event.target.checked);
          }}
        />
        <span>{node.label}</span>
      </label>

      <div className={styles.child}>
        {!!node.children.length &&
          isExpanded &&
          node.children.map((nodes) => (
            <RenderNodes
              key={nodes.id}
              node={nodes}
              handleCheck={handleCheck}
              expanded={expanded}
              handleExpand={handleExpand}
            />
          ))}
      </div>
    </div>
  );
};

export default RenderNodes;
