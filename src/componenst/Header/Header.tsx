import React from "react"
import {Avatar, Button, Col, Layout, Menu, Row} from "antd"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {currentLogin, selectIsAuth} from "../../Redux/auth-selectors"
import {logout} from "../../Redux/AuthReducer"



export const Header: React.FC = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(currentLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Users</Link></Menu.Item>
                    </Menu>
                </Col>

                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar alt={login || ""} size={40}>USER</Avatar>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={"/login"}>Login</Link>
                        </Button>
                    </Col>

                }
            </Row>

        </Header>
    )
}

