import { Button, Table } from "reactstrap";
import PropTypes from "prop-types";
import "./Grid.css";

function Grid({ header = [], values = [], actions = [], onRowClick = () => {} }) {
  return (
    <Table className="grid-table" hover>
      <thead>
        <tr>
          {header.map((colName) => {
            const isString = typeof colName === "string";
            const label = isString ? colName : colName.label;
            const cellContent = label.replaceAll("_", " ");
            const alignRight = !isString && colName.type === "number";

            return (
              <th key={colName} className={alignRight ? "text-right" : ""}>
                {cellContent}
              </th>
            );
          })}
          {!!actions.length && <th className="text-right">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index} onClick={(e) => onRowClick(e, index)}>
            {header.map((colName) => {
              const isString = typeof colName === "string";
              const label = isString ? row[colName] : row[colName.label];
              const isArray = Array.isArray(label);
              const cellContent = isArray ? label.length : label;
              const alignRight = !isString && colName.type === "number";

              return (
                <td key={colName} className={alignRight ? "text-right" : ""}>
                  {cellContent}
                </td>
              );
            })}
            {!!actions.length && (
              <td className="grid-actions text-right">
                {actions.map(({ label, action, relatedField }) =>
                  !!row[relatedField].length ? (
                    <Button key={label} size="sm" onClick={(e) => action(e, index)}>
                      {label}
                    </Button>
                  ) : null
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

Grid.propTypes = {
  header: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  actions: PropTypes.array,
  onRowClick: PropTypes.func,
};

export default Grid;
