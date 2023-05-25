<script>
    import { Router, Route } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
    import Signup from "./pages/Auth/SignupPage.svelte";
    import Login from "./pages/Auth/LoginPage.svelte";
    import Topbar from "./components/Navbars/Topbar.svelte";
    import Footer from "./components/Footer/Footer.svelte";
    import GoogleMaps from "./components/Events/MapEvents.svelte";
    import ChatPage from "./pages/ChatPage/ChatPage.svelte";
    import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage.svelte";
    import UpdatePasswordPage from "./pages/Auth/UpdatePasswordPage.svelte";
    import FrontPage from "./pages/FrontPage/FrontPage.svelte";
    import FeedbackPage from "./pages/FeedbackPage/FeedbackPage.svelte";
    import ProfilePage from "./pages/ProfilePage/ProfilePage.svelte";
    import EventsPage from "./pages/EventsPage/EventsPage.svelte";
    import NewsfeedPage from "./pages/NewsfeedPage/NewsfeedPage.svelte";
    import SettingsPage from "./pages/SettingsPage/SettingsPage.svelte";
    import RapportPage from "./pages/RapportPage/RapportPage.svelte";
    import PublishEventPage from "./pages/PublishEventPage/PublishEventPage.svelte";
    import RatingPage from "./pages/RatingPage/RatingPage.svelte";
</script>

<Router>
   
    <Topbar/>
    
    
    <main>

        <!-- Public routes -->

        <Route path="/login" component={Login}></Route>
        <!--
        <Route path="/signup" component={Signup}></Route>
        <Route path="/forgot-password" component={ForgotPasswordPage}></Route>
        <Route path="/update-password" component={UpdatePasswordPage}></Route>
        <Route path="/" component={FrontPage}></Route>
        <Route path="/maps" component={GoogleMaps}></Route>
        -->
        


        <!-- Private routes: Admin -->
        <PrivateRoute path="/rapports">
            <RapportPage/>
        </PrivateRoute>

        <PrivateRoute path="/publish-events">
            <PublishEventPage/>
        </PrivateRoute>

        <PrivateRoute path="/rating">
           <RatingPage/>
        </PrivateRoute>

        <!-- Private routes: Users -->
        <PrivateRoute path="/profile">
            <ProfilePage/>
        </PrivateRoute>

        <PrivateRoute path="/settings">
            <SettingsPage/>
        </PrivateRoute>

        <PrivateRoute path="/feedback">
            <FeedbackPage/>
        </PrivateRoute>
        
        <PrivateRoute path="/events">
            <EventsPage/>
        </PrivateRoute>


        <!-- for all -->

        <PrivateRoute path="/chat">
            <ChatPage/>
        </PrivateRoute>

        <PrivateRoute path="/newsfeed">
            <NewsfeedPage/>
        </PrivateRoute> 

        

        

        
    </main>

</Router>


<Footer/>

