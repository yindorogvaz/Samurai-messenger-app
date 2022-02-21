import React, {Component, ComponentType} from "react"
import "./App.css"
import "antd/dist/antd.css"
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom"
import {UsersPage} from "./componenst/Users/UsersContainer"
import {LoginPage} from "./componenst/Login/Login"
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./Redux/AppReducer"
import Preloader from "./componenst/Common/Preloader/Preloader"
import store, {AppStateType} from "./Redux/ReduxStore"
import {withSuspense} from "./hoc/withSuspense"

import {Layout, Menu, Breadcrumb} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Header} from "./componenst/Header/Header";
import {Footer} from "antd/es/layout/layout";


const { SubMenu } = Menu;
const {Content, Sider } = Layout;

const DialogsContainer = React.lazy(() => import("./componenst/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./componenst/Profile/ProfileContainer"))
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"))

//lazy говорит что эту компоненту оставляют на потом, когад надо будет отрисовать

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogsContainer = withSuspense(DialogsContainer)
const SuspendedProfileContainer = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)


class App extends Component<MapPropsType & DispatchPropsType>{
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (

            <Layout>
                <Header />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>

                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                    <Menu.Item key="1"><Link to="/profile" >Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs" >Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                                    <Menu.Item key="3"><Link to="/users" >Users</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="4"><Link to="/chat" >Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>

                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route exact path="/"
                                       render={ () => <Redirect to={"/Profile"} />}/>

                                <Route path="/dialogs"
                                       render={ () => <SuspendedDialogsContainer />}/>

                                <Route path="/profile/:userId?"
                                       render={ () => <SuspendedProfileContainer />}/>

                                <Route path="/users"
                                       render={ () => <UsersPage pageTitle={"Users"}/>}/>

                                <Route path="/login"
                                       render={ () => <LoginPage/>}/>

                                <Route path="/chat"
                                       render={ () => <SuspendedChatPage />}/>

                                <Route path="*"
                                       render={ () => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: "center"}}>Test App 2022 React, Redux, TypeScript</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp