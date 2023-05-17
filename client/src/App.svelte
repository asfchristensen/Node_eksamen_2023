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
</script>

<Router>
   
    <Navbar/>
    
    <main>

        <!-- Public routes -->

        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" component={Home}></Route>


        <!-- Private routes -->
        <PrivateRoute path="/admin">
            <Admin/>
        </PrivateRoute>
        <!-- for all -->
        <PrivateRoute path="/profile">
            <Profile/>
        </PrivateRoute>

        <PrivateRoute path="/newsFeed">
            <NewsFeed/>
        </PrivateRoute>


    </main>

</Router>



<Footer/>

