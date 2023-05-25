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
    import ReportPage from "./pages/ReportPage/ReportPage.svelte";
    import RatingPage from "./pages/RatingPage/RatingPage.svelte";
    import PublicEventPage from "./pages/PublicEventPage/PublicEventPage.svelte";
</script>

<Router>
   
    <Topbar/>
    
    
    <main>

        <!-- Public routes -->

        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/forgot-password" component={ForgotPasswordPage}></Route>
        <Route path="/update-password" component={UpdatePasswordPage}></Route>
        <Route path="/" component={FrontPage}></Route>
        <Route path="/maps" component={GoogleMaps}></Route>


        <!-- for admin only -->
        <PrivateRoute path="/reports" role={1}>
            <ReportPage/>
        </PrivateRoute>

        <PrivateRoute path="/public-events" role={1}>
            <PublicEventPage/>
        </PrivateRoute>

        <PrivateRoute path="/rating" role={1}>
            <RatingPage/>
        </PrivateRoute>

        <!-- for user -->
        <PrivateRoute path="/profile" role={2}>
            <ProfilePage/>
        </PrivateRoute> 

        <PrivateRoute path="/feedback" role={2}>
            <FeedbackPage/>
        </PrivateRoute>

        <PrivateRoute path="/events" role={2}>
            <EventsPage/>
        </PrivateRoute>

        <PrivateRoute path="/settings" role={2}>
            <SettingsPage/>
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

