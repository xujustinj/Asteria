import React from "react";

export class Row {
    constructor(public key: number, public values: Map<string, any>) {}
}

function TableHeader(props: { names: string[] }) {
    const header="header";
    return (
      <thead>
        <tr key={header}>
          {props.names.map((name) => <th key={header + '-' + name}>{name}</th>)}
        </tr>
      </thead>
    );
}

function TableBody(props: { names: string[], rows: Row[] }) {
    const rows = props.rows.map((row) => (
      <tr key={row.key}>
        {props.names.map(
            (name) => <td key={row.key + '-' + name}>{row.values.get(name)}</td>
        )}
      </tr>
    ));
    return (
      <tbody>{rows}</tbody>
    );
}

function Table(props: { rows: Row[] }) {
    const { rows } = props;
    const names = Array.from(rows[0].values.keys());
    return (
      <table>
        <TableHeader names={names} />
        <TableBody names={names} rows={rows} />
      </table>
    );
}

export default Table;
