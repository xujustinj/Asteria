import React from "react";

export type TableRow = {
    m: number | undefined;
    b: number | undefined;
    r: number | undefined;
};

function TableHeader(): JSX.Element {
    return (
      <thead>
        <tr>
          <th>G</th>
          <th>m</th>
          <th>b</th>
          <th>R</th>
        </tr>
      </thead>
    );
}

function TableBody(props: { data: TableRow[] }): JSX.Element {
    const rows = props.data.map((row: TableRow, index: number) => {
        const { m, b, r } = row;
        return (
          <tr key={index}>
            <td>{index}</td>
            <td>{m ?? ""}</td>
            <td>{b ?? ""}</td>
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
