import React from 'react';

export type TableRow = {
    m: number;
    b: number;
    r: number;
}

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
    return (
        <tbody>{props.data.map((row: TableRow, index: number) => {
            let { m, b, r } = row;
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{isFinite(m) ? m : ""}</td>
                    <td>{isFinite(b) ? b : ""}</td>
                    <td>{isFinite(r) ? r : ""}</td>
                </tr>
            )
        })}</tbody>
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
