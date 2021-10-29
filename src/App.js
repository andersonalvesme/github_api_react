import React, {useEffect} from 'react';
import './App.css';
import {Pagination, Pane, Table} from 'evergreen-ui';

function App() {
    const perPage = 5;
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(5);
    const [users, setUsers] = React.useState([]);

    const handlePreviousPage = () => {
        setPage(page - 1);
        setTotalPages(page * perPage);
        fetchUsers();
    };
    const handlePageChange = (page: number) => {
        setPage(page);
        setTotalPages(page * perPage);
        fetchUsers();
    };
    const handleNextPage = () => {
        setPage(page + 1);
        setTotalPages(page * perPage);
        fetchUsers();
    };

    const fetchUsers = () => {
        fetch('http://localhost:8080/api/users?per_page=' + perPage + '&since=' + ((page - 1) * perPage))
            .then(response => response.json())
            .then(data => setUsers(data));
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Pane height={"auto"} width={600} display="block" alignItems="center" justifyContent="center" border="default">
            <Table width={"100%"} height={"100%"} display="block">
                <Table.Head>
                    <Table.TextHeaderCell>ID</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body maxWidth={1152} width="100%">
                    {users.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.TextCell>{user.id}</Table.TextCell>
                            <Table.TextCell>{user.login}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Pagination page={page} totalPages={totalPages} display="block" onPreviousPage={handlePreviousPage}
                        onPageChange={handlePageChange} onNextPage={handleNextPage}/>
        </Pane>
    )
}

export default App;
