<script>
    import { Router, Route } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
    import Signup from "./pages/Signup/Signup.svelte";
    import Login from "./pages/Login/Login.svelte";
    import Profile from "./pages/Profile/Profile.svelte";
    import Navbar from "./components/Navbar/Navbar.svelte";
    import Footer from "./components/Footer/Footer.svelte";
    import NewsFeed from "./pages/NewsFeed/NewsFeed.svelte";
    import Admin from "./pages/Admin/Admin.svelte";
    import Home from "./pages/Home/Home.svelte";
    import GoogleMaps from "./components/Events/MapEvents.svelte";
    import AdminEvent from "./pages/AdminEvent/AdminEvent.svelte";
    import ChatPage from "./pages/ChatPage/ChatPage.svelte";
    import StatisticsPage from "./pages/Statistics/StatisticsPage.svelte";
</script>

<Router>
   
    <Navbar/>
    
    <main>

        <!-- Public routes -->

        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/maps" component={GoogleMaps}></Route>
        <Route path="/admin-event" component={AdminEvent}></Route>


        <!-- Private routes -->
        <PrivateRoute path="/admin">
            <Admin/>
        </PrivateRoute>
        <PrivateRoute path="/statistic">
            <StatisticsPage/>
        </PrivateRoute>

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

