import React, {useEffect} from "react"
import {Heading, Pagination, Pane, Table} from "evergreen-ui"

const UserRepos = (props) => {
    const userName = props.userName;
    const perPage = 5;
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(5);
    const [repos, setRepos] = React.useState([]);

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
        const fetchRepos = () => {
            fetch(process.env.REACT_APP_API + '/api/users/' + userName + '/repos?per_page=' + perPage + '&page=' + page)
                .then(response => response.json())
                .then(data => setRepos(data));
        }

        fetchRepos()
    }, [page, userName]);

    return (
        <Pane height={"auto"} display="block" border="default">
            <Heading size={800} margin={20}>List of repos</Heading>
            <Table width={"100%"} height={"100%"} display="block">
                <Table.Head maxHeight={"35px"}>
                    <Table.TextHeaderCell flexShrink={0} flexGrow={0} flex="10%">ID</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexShrink={0} flexGrow={0} flex="40%">Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexShrink={0} flexGrow={0} flex="50%">URL</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body maxWidth={1152} width="100%">
                    {repos.length > 0 ?
                        repos.map((repo) => (
                            <Table.Row key={repo.id} maxHeight={"35px"}>
                                <Table.TextCell flexShrink={0} flexGrow={0} flex="15%">{repo.id}</Table.TextCell>
                                <Table.TextCell flexShrink={0} flexGrow={0} flex="35%">{repo.login}</Table.TextCell>
                                <Table.TextCell flexShrink={0} flexGrow={0} flex="50%">{repo.url}</Table.TextCell>
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
export default UserRepos;