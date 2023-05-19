<script>
    import { Router, Route } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
    import Signup from "./pages/Signup/Signup.svelte";
    import Login from "./pages/Login/Login.svelte";
    import Profile from "./pages/Profile/Profile.svelte";
    import Navbar from "./components/Navbar/Navbar.svelte";
    import Footer from "./components/Footer/Footer.svelte";
    import NewsFeed from "./pages/NewsFeed/NewsFeed.svelte";
    import ChatPage from "./pages/ChatPage/ChatPage.svelte";
</script>

<Router>
   
    <Navbar/>

    <main>
        <!-- Public routes -->

        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>

        <!-- Private routes -->

        <!-- for all -->
        <PrivateRoute path="/profile">
            <Profile/>
        </PrivateRoute>

        <PrivateRoute path="/newsFeed">
            <NewsFeed/>
        </PrivateRoute>

        <PrivateRoute path="/chat">
            <ChatPage/>
        </PrivateRoute>
    </main>

</Router>

<Footer/>

