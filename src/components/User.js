import React, {useEffect} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {Button, Heading, Pane, Table, Text} from "evergreen-ui";
import UserRepos from "./UserRepos";

const User = () => {
    const history = useHistory();
    const {id} = useParams();
    const [user, setUser] = React.useState({});

    useEffect(() => {
        const fetchUser = () => {
            fetch(process.env.REACT_APP_API + '/api/users?per_page=1&since=' + id)
                .then(response => response.json())
                .then(data => setUser(data[0]));
        }

        fetchUser()
    }, []);

    return (
        <div className="user">
            <Pane height={"auto"} display="block" border="default" marginBottom={30}>
                <Button display={"inline"} margin={20} marginRight={10} size={"small"}
                        onClick={() => history.push("/")}>Return</Button>
                <Heading size={800} display={"inline"}>{user.login}</Heading>
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.TextCell flexShrink={0} flexGrow={0} flex="10%">
                                <Heading>ID</Heading>
                                <Text>{user.id}</Text>
                            </Table.TextCell>
                            <Table.TextCell flexShrink={0} flexGrow={0} flex="30%">
                                <Heading>LOGIN</Heading>
                                <Text>{user.login}</Text>
                            </Table.TextCell>
                            <Table.TextCell flexShrink={0} flexGrow={0} flex="40%">
                                <Heading>PROFILE</Heading>
                                <Text>{user.url}</Text>
                            </Table.TextCell>
                            <Table.TextCell flexShrink={0} flexGrow={0} flex="20">
                                <Heading>CREATED</Heading>
                                <Text>{user.created_at}</Text>
                            </Table.TextCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Pane>
            <UserRepos userName={user.login}/>
        </div>
    );
};
export default User;
