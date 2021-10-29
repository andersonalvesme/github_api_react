import React, {useEffect} from "react"
import {Heading, Pagination, Pane, Table} from "evergreen-ui"
import {useHistory} from "react-router-dom";

const Home = () => {
    const history = useHistory();
    const perPage = 5;
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(5);
    const [users, setUsers] = React.useState([]);

    const fetchUsers = () => {
        fetch(process.env.REACT_APP_API + '/api/users?per_page=' + perPage + '&since=' + ((page - 1) * perPage))
            .then(response => response.json())
            .then(data => setUsers(data));
    }
    const handlePageChange = (page: number) => {
        setPage(page);
        setTotalPages(page >= 5 ? page + 1 : 5);
    };
    const handlePreviousPage = () => {
        handlePageChange(page - 1);
    };
    const handleNextPage = () => {
        handlePageChange(page + 1);
    };

    useEffect(() => {
        fetchUsers()
    }, [page]);

    return (
        <Pane height={"auto"} display="block" border="default">
            <Heading size={800} margin={20}>List of users</Heading>
            <Table width={"100%"} height={"100%"} display="block">
                <Table.Head maxHeight={"35px"}>
                    <Table.TextHeaderCell flexShrink={0} flexGrow={0} flex="10%">ID</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexShrink={0} flexGrow={0} flex="auto">Name</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body maxWidth={1152} width="100%">
                    {users.length > 0 ?
                        users.map((user) => (
                            <Table.Row key={user.id} isSelectable onSelect={() => history.push("/user/" + user.id)}
                                       maxHeight={"35px"}>
                                <Table.TextCell flexShrink={0} flexGrow={0} flex="10%">{user.id}</Table.TextCell>
                                <Table.TextCell flexShrink={0} flexGrow={0}
                                                flex="auto">{user.login}</Table.TextCell>
                            </Table.Row>
                        ))
                        :
                        <Table.Row>
                            <Table.TextCell>There wasn't possible load data. Can be the rate limit.</Table.TextCell>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
            <Pagination page={page} totalPages={totalPages} display="block" onPreviousPage={handlePreviousPage}
                        onPageChange={handlePageChange} onNextPage={handleNextPage} margin={"15px"}/>
        </Pane>
    )
};
export default Home;