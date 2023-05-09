<script>
    import { Router, Route } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
    import Signup from "./pages/Signup/Signup.svelte";
    import Login from "./pages/Login/Login.svelte";
    import Profile from "./pages/Profile/Profile.svelte";
    import Navbar from "./components/Navbar/Navbar.svelte";
    import Footer from "./components/Footer/Footer.svelte";
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
    </main>

</Router>

<Footer/>

