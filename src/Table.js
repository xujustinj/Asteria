import React from 'react';

function TableHeader() {
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

function TableBody(props) {
    return (
        <tbody>{props.data.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{row.m}</td>
                    <td>{row.b}</td>
                    <td>{row.r}</td>
                </tr>
            )
        })}</tbody>
    );
}

function Table(props) {
    const { data } = props;

    return (
        <table>
            <TableHeader />
            <TableBody data={data} />
        </table>
    );
}

export default Table;
