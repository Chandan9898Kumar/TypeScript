import {memo} from 'react';
const Interest = ({ checkboxes = [], handleCheckboxChange = () => {} }) => {
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        {checkboxes?.map((checkbox) => (
          <div key={checkbox.id} style={{ marginBottom: "0.5rem" }}>
            <label>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
              <span style={{ marginLeft: "0.5rem" }}>{checkbox.name}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(Interest);
