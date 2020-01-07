import React from "react";

export type TableRow = {
    r: number | undefined;
};

function TableHeader(): JSX.Element {
    return (
      <thead>
        <tr>
          <th>G</th>
          <th>R</th>
        </tr>
      </thead>
    );
}

function TableBody(props: { data: TableRow[] }): JSX.Element {
    const rows = props.data.map((row: TableRow, index: number) => {
        const { r } = row;
        return (
          <tr key={index}>
            <td>{index}</td>
            <td>{r ?? ""}</td>
          </tr>
        )
    }).reverse();
    return (
        <tbody>{rows}</tbody>
    );
}

function Table(props: { data: TableRow[] }) {
    const { data } = props;
    return (
      <table>
        <TableHeader />
        <TableBody data={data} />
      </table>
    );
}

export default Table;
