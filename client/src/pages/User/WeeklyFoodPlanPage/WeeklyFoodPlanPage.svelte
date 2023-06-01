<script>
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { post } from "../../../api/api.js";
    import { recipes } from "../../../stores/userGlobals.js";
    import { publicRecipes } from "../../../stores/publicRecipes.js";
    import { user } from "../../../stores/userGlobals.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import ProfileInfo from "../../../components/Profile/ProfileInfo/ProfileInfo.svelte";
    import WeeklyFoodDropdown from "../../../components/Profile/WeeklyFoodDropdown/WeeklyFoodDropdown.svelte";
    import toastr from "toastr";
    import NavigateToButton from "../../../components/Templates/Buttons/NavigateToButton.svelte";
    
    $: myLikes = $publicRecipes.filter(recipe => recipe.likes && recipe.likes.includes($user.email));
    $: combinedRecipeLists = myLikes.concat($recipes);

    let mondayRecipe;
    let tuesdayRecipe;
    let wednesdayRecipe;
    let thursdayRecipe;
    let fridayRecipe;
    let saturdayRecipe;
    let sundayRecipe;

    async function handleCreateWeeklyPlan() {
        const url = $BASE_URL + "/api/user/weekly-plan";
        const weeklyPlan = [
            { day: "Monday", recipe: mondayRecipe.title },
            { day: "Tuesday", recipe: tuesdayRecipe.title },
            { day: "Wednesday", recipe: wednesdayRecipe.title },
            { day: "Thursday", recipe: thursdayRecipe.title },
            { day: "Friday", recipe: fridayRecipe.title },
            { day: "Saturday", recipe: saturdayRecipe.title },
            { day: "Sunday", recipe: sundayRecipe.title },
        ]; 
        const weeklyPlanToJSON = JSON.stringify(weeklyPlan);

        const result = await post(url, weeklyPlanToJSON);

        if (result.status === 200) {
            toastr.success("Weekly Food Plan sent to your email");
        } else {
            toastr.error("Failed to send Weekly Food Plan");
        }       
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>My weekly food plan</h2>
        
        <form on:submit|preventDefault={handleCreateWeeklyPlan}>
        <table>
            <thead>
              <tr>
                <th scope="col">DAY</th>
                <th scope="col">CHOOSE RECIPE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={mondayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={tuesdayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={wednesdayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={thursdayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={fridayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={saturdayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>
                    <WeeklyFoodDropdown
                        bind:day={sundayRecipe}
                        list={combinedRecipeLists}
                    />
                </td>
              </tr>
            </tbody>
        </table>
        <button type="submit">Send weekly plan</button>
    </form>
    </div>
    <div class="col-right">
        <ProfileInfo/>
        <NavigateToButton 
            path="/profile" 
            buttonTitle="Go back" 
        />
    </div>
</div>