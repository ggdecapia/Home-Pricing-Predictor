// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

// The current presentation mode saved as a global variable
var current_mode = 'home';

// The current set of hurricane json data retrieved from the server
var current_data = [];

// Select the input elements
var latitudeInputElement = d3.select("#latitudeform");
var longitudeInputElement = d3.select("#longitudeform");
var yearInputElement = d3.select("#yearform");
var sqftlivingInputElement = d3.select("#sqftlivingform");
var floorsInputElement = d3.select("#floorsform");
var sqftaboveInputElement = d3.select("#sqftaboveform");
var sqftbasementInputElement = d3.select("#sqftbasementform");
var sqftlotInputElement = d3.select("#sqftlotform");
var bedroomsInputElement = d3.select("#bedroomsform");
var bathroomsInputElement = d3.select("#bathroomsform");
var conditionInputElement = d3.select("#conditionform");
var gradeInputElement = d3.select("#gradeform");

// Select the button
var search_button1 = d3.select("#search-btn1");
var search_button2 = d3.select("#search-btn2");

search_button1.on("click", handleFeatureChange);
search_button2.on("click", handleFeatureChange);



// NOTE: UPDATE THIS FOR FILTER BAR CHANGES
function GetFeatureBarInputValues()
{
    console.log("Entering GetFeatureBarInputValues()");

    dict = {};
    dict["latitude"]     = latitudeInputElement.property("value");
    dict["longitude"]    = longitudeInputElement.property("value");
    dict["year"]         = yearInputElement.property("value");
    dict["sqftliving"]   = sqftlivingInputElement.property("value");
    dict["floors"]       = floorsInputElement.property("value");
    dict["sqftabove"]    = sqftaboveInputElement.property("value");
    dict["sqftbasement"] = sqftbasementInputElement.property("value");
    dict["sqftlot"]      = sqftlotInputElement.property("value");
    dict["bedrooms"]     = bedroomsInputElement.property("value");
    dict["bathrooms"]    = bathroomsInputElement.property("value");
    dict["condition"]    = conditionInputElement.property("value");
    dict["grade"]        = gradeInputElement.property("value");

    console.log("Exiting GetFeatureBarInputValues()");

    return dict;
}


// Function to handle changes to the search criteria
// NOTE: UPDATE THIS FOR FILTER BAR CHANGES
function handleFeatureChange(event) {

    console.log("Entering handleFeatureChange(): Flying is for droids.");

    // Prevent the page from refreshing
    //d3.event.preventDefault();

    var filteredData = [];

    // Returns a dictionary of the filter bar values
    inputs = GetFeatureBarInputValues();

    latitudeform_value = inputs["latitude"];  // could be "ALL" or could be a specific value
    longitudeform_value = inputs["longitude"];  // could be "ALL" or could be a specific value
    yearform_value = inputs["year"];  // could be "ALL" or could be a specific value
    sqftlivingform_value = inputs["sqftliving"];  // could be "ALL" or could be a specific value
    floorsform_value = inputs["floors"];  // could be "ALL" or could be a specific value
    sqftaboveform_value = inputs["sqftabove"];  // could be "ALL" or could be a specific value
    sqftbasementform_value = inputs["sqftbasement"];  // could be "ALL" or could be a specific value
    sqftlotform_value = inputs["sqftlot"];  // could be "ALL" or could be a specific value
    bedroomsform_value = inputs["bedrooms"];  // could be "ALL" or could be a specific value
    bathroomsform_value = inputs["bathrooms"];  // could be "ALL" or could be a specific value
    conditionform_value = inputs["condition"];  // could be "ALL" or could be a specific value
    gradeform_value = inputs["grade"];  // could be "ALL" or could be a specific value

    // Assemble the search URL to match the search bar filters selected
    // ggd: var search_url = "/predict_MLR_price?"; 
    var search_url = "/predict_price?";
    if (current_mode == "home") {
        search_url = "/predict_price?";
    } else if (current_mode == "NN") {
        search_url = "/predict_NN_price?";
    } else if (current_mode == "MLR") {
        search_url = "/predict_MLR_price?";
    } 
    
    var num_params = 0;

    if (latitudeform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("lat=");
        search_url = search_url.concat(latitudeform_value);
        num_params++;
    }

    if (longitudeform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("long=");
        search_url = search_url.concat(longitudeform_value);
        num_params++;
    }

    if (yearform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("yr_built=");
        search_url = search_url.concat(yearform_value);
        num_params++;
    }

    if (sqftlivingform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_living=");
        search_url = search_url.concat(sqftlivingform_value);
        num_params++;
    }

    if (floorsform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("floors=");
        search_url = search_url.concat(floorsform_value);
        num_params++;
    }

    if (sqftaboveform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_above=");
        search_url = search_url.concat(sqftaboveform_value);
        num_params++;
    }

    if (sqftbasementform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_basement=");
        search_url = search_url.concat(sqftbasementform_value);
        num_params++;
    }

    if (sqftlotform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_lot=");
        search_url = search_url.concat(sqftlotform_value);
        num_params++;
    }

    if (bedroomsform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("bedrooms=");
        search_url = search_url.concat(bedroomsform_value);
        num_params++;
    }

    if (bathroomsform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("bathrooms=");
        search_url = search_url.concat(bathroomsform_value);
        num_params++;
    }

    if (conditionform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("condition=");
        search_url = search_url.concat(conditionform_value);
        num_params++;
    }

    if (gradeform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("grade=");
        search_url = search_url.concat(gradeform_value);
        num_params++;
    }

    console.log("Constructing Search URL = ", search_url);

    // // Access the database and grab the data matching the requirements
    d3.json(search_url).then(function (json_data) 
    {
        // handleFeatureChange() during a handleModeChange() event
        current_data = json_data;

        console.log("Accessing URL:", search_url);
        console.log("Prediction models returns: ", current_data);

        UpdatePresentationWindow(current_data);

    });

    console.log("Exiting handleFeatureChange(): Another Happy Landing!");

    return false;
}

function handleModeChange(new_mode)
{
    console.log("Entering handleModeChange()");

    // current_mode is a global variable that can be accessed in other functions
    console.log("handleModeChange(): The currently active mode seems to be ...", current_mode);
    current_mode = new_mode;
    console.log("handleModeChange(): The new mode selected seems to be ...", new_mode);

    // Update the Bootstrap Dropdown Menu Text
    if (current_mode == "home")
        $('#navbarDropdown').text("Home");
    else if (current_mode == "NN")
        $('#navbarDropdown').text("Neural Network");
    else if (current_mode == "MLR")
        $('#navbarDropdown').text("Multi-Linear Regression");
    else
        $('#navbarDropdown').text("FIXME");

    // FIXME - Try caching the previous results of this function globally so we 
    // don't have to query the database everytime we change a presentation mode.
    //handleFilterChange();
    // - or -
    UpdatePresentationWindow(current_data);
    search_button1.dispatch('click');

    console.log("Exiting handleModeChange()");

}

function UpdatePresentationWindow(json_data)
{
    console.log("Entering UpdatePresentationWindow()");

    //d3.selectAll("#Data_Presentation_Window > *").remove();
    //document.getElementById("Data_Presentation_Window").innerHTML = "";    
    //document.getElementById("Data_Presentation_Window").classList.remove('leaflet-container', 'leaflet-retina', 'leaflet-fade-anim', 'leaflet-grab', 'leaflet-touch-drag');

    //var mode = d3.select("#PresentationMode").property("value");
    //var mode = d3.select("#PresentationMode").value; 
    var mode = current_mode;    // Global variable

    if (mode == "home") {
        homeMethod(json_data);
    }
    else if (mode == "NN") {
        NN_Method(json_data);
    }
    else if (mode == "MLR") {
        MLR_Method(json_data);
    }
    console.log("Exiting UpdatePresentationWindow()");
}

function homeMethod(json_data)
{
    console.log("Entering homeMethod()...");

    console.log(json_data);

    //ggd    
    //window.location.reload();
    //var globePath = "..\\static\\images\\globe.jpg";
    var titleArea = d3.select("#displayTitle");
    var summaryArea = d3.select("#Data_Presentation_Summary");
    var displayArea = d3.select("#Data_Presentation_Window");
   
    //ggd
    // Reset the title, summary, and display divs to empty
    titleArea.html("");
    summaryArea.html("");
    //displayArea.html("");

    titleArea.append("p").text("Pricing model for houses in the Seattle (King County), Washington area.");

    var formatted_value;

    formatted_value = d3.format("($,.2f")(json_data["predicted_value_NN"]);
    
    summaryArea.append("p").text("Neural Network pricing model suggests ");
    summaryArea.append("p").text(formatted_value);

    formatted_value = json_data["predicted_value_MLR"];

    formatted_value = d3.format("($,.2f")(json_data["predicted_value_MLR"]);
    summaryArea.append("p").text("Multi-Linear Regression pricing model suggests ");
    summaryArea.append("p").text(formatted_value);


    /*
    //Add the summary
    //summaryArea.insert("h2").text("Home - Welcome to the International Hurricane Database");
    summaryArea.insert("p").text("Please use the search bar on the left to select the features of the house you are interested in. Use the dropdown menu above to change the price prediction model.");
    summaryArea.insert("p").text("Project by Chris Sadlo, Glenda Decapia, Katrice Trahan, and Sarah Kachelmeier");

    summaryArea.insert("p").text("BUILDING CONDITION");
    summaryArea.insert("p").text("Relative to age and grade. Coded 1-5.");
    summaryArea.insert("p").text("5 = Very Good - All items well maintained, many having been overhauled and repaired as they have shown signs of wear, increasing the life expectancy and lowering the effective age with little deterioration or obsolescence evident with a high degree of utility.");
    summaryArea.insert("p").text("4 = Good - No obvious maintenance required but neither is everything new. Appearance and utility are above the standard and the overall effective age will be lower than the typical property.");
    summaryArea.insert("p").text("3 = Average - Some evidence of deferred maintenance and normal obsolescence with age in that a few minor repairs are needed, along with some refinishing. All major components still functional and contributing toward an extended life expectancy. Effective age and utility is standard for like properties of its class and usage.");
    summaryArea.insert("p").text("2 = Fair - Badly worn. Much repair needed. Many items need refinishing or overhauling, deferred maintenance obvious, inadequate building utility and systems all shortening the life expectancy and increasing the effective age.");
    summaryArea.insert("p").text("1 = Poor - Worn out. Repair and overhaul needed on painted surfaces, roofing, plumbing, heating and numerous functional inadequacies. Excessive deferred maintenance and abuse, limited value-in-use, approaching abandonment or major reconstruction; reuse or change in occupancy is imminent. Effective age is near the end of the scale regardless of the actual chronological age.");


    summaryArea.insert("p").text("BUILDING GRADE");
    summaryArea.insert("p").text("Represents the construction quality of improvements. Grades run from grade 1 to 13. Generally defined as:\n \
                                13 = Generally custom designed and built. Mansion level. Large amount of highest quality cabinet work, wood trim, marble, entry ways etc.\n \
                                12 = Custom design and excellent builders. All materials are of the highest quality and all conveniences are present.\n \
                                11 = Custom design and higher quality finish work with added amenities of solid woods, bathroom fixtures and more luxurious options.\n");
    summaryArea.insert("p").text("10 = Homes of this quality generally have high quality features. Finish work is better and more design quality is seen in the floor plans. Generally have a larger square footage.");
    summaryArea.insert("p").text("9	= Better architectural design with extra interior and exterior design and quality.");
    summaryArea.insert("p").text("8	= Just above average in construction and design. Usually better materials in both the exterior and interior finish work.");
    summaryArea.insert("p").text("7	= Average grade of construction and design. Commonly seen in plats and older sub-divisions.");
    summaryArea.insert("p").text("6	= Lowest grade currently meeting building code. Low quality materials and simple designs.");
    summaryArea.insert("p").text("5	= Low construction costs and workmanship. Small, simple design.");
    summaryArea.insert("p").text("4	= Generally older, low quality construction. Does not meet code.");
    summaryArea.insert("p").text("1-3 =Falls short of minimum building standards. Normally cabin or inferior structure.");*/

    // displayArea.append("img")
    //    .attr("src", globePath)
    //    .attr("width", "500")
    //    .attr("height", "500");

    console.log("Exiting homeMethod()...");
}

function NN_Method(json_data)
{
    console.log("Entering NN_Method()...");

    //var globePath = "..\\static\\images\\globe.jpg";
    var titleArea = d3.select("#displayTitle");
    var summaryArea = d3.select("#Data_Presentation_Summary");
    //var displayArea = d3.select("#Data_Presentation_Window");

    // Reset the title, summary, and display divs to empty
    titleArea.html("");
    summaryArea.html("");
    //displayArea.html("");

    console.log("The data is: ", json_data);
    console.log("The data is: ", json_data["predicted_value_NN"]);

    //ggd
    //renderPredictedDisplay(json_data, "Neural Network");
    formatted_value = d3.format("($,.2f")(json_data["predicted_value_NN"])
    titleArea.append("p").text("Welcome to the King County Home Price Predictor");
    titleArea.append("p").text(formatted_value);

    console.log("Exiting NN_Method()...");

}

// function renderPredictedDisplay(json_data, typeDisplay) {
//     var titleArea = d3.select("#displayTitle");
//     var displayArea = d3.select("#Data_Presentation_Window");

//     formatted_value = d3.format("($,.2f")(json_data["predicted_value"])
//     titleArea.append("p").text("Welcome to the King County Home Price Predictor");
//     titleArea.append("p").text("Price predicted from the " + typeDisplay + " is ");
//     //titleArea.append("p").text(json_data["predicted_value"]);
//     //titleArea.append("p").text(formatted_value);
//     var predictedValueDisplay = displayArea.append("p");
//     predictedValueDisplay.attr("class", "predicted-value");
//     predictedValueDisplay.text(formatted_value);
// }

function MLR_Method(json_data)
{
    console.log("Entering MLR_Method()...");

    //var globePath = "..\\static\\images\\globe.jpg";
    var titleArea = d3.select("#displayTitle");
    var summaryArea = d3.select("#Data_Presentation_Summary");
    var displayArea = d3.select("#Data_Presentation_Window");

    // Reset the title, summary, and display divs to empty
    titleArea.html("");
    summaryArea.html("");
    //displayArea.html("");

    console.log("The data is: ", json_data);
    console.log("The data is: ", json_data["predicted_value_MLR"]);

    //ggd
    //renderPredictedDisplay(json_data, "Multi-Linear Regression");
    formatted_value = d3.format("($,.2f")(json_data["predicted_value_MLR"])
    titleArea.append("p").text("Welcome to the King County Home Price Predictor");
    titleArea.append("p").text(formatted_value);

    console.log("Exiting MLR_Method()...");

}