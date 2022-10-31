
//start page loader..//
$(document).ready(function(){
    $("#iconloader").fadeOut(1000 , function(){
        $("#loadingSection").fadeOut(1000 , function(){
            $("body").css("overflow","auto")
        })
    })
})
let row = document.getElementById("rowData")
var nvWidth = 0,
isTrue = !0
dataContainer=[]


$(".strip-toggel-menu").click(function () {
    isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), nvWidth = $(".nav-tab-menu").width() - 10, $(".strip-header-nav").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".nav-tab-menu .item1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100), $(".nav-tab-menu .item2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200), $(".nav-tab-menu .item3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300), $(".nav-tab-menu .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400), $(".nav-tab-menu .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), $(".nav-tab-menu .item6").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1600), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0), $(".nav-tab-menu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 500), isTrue = !isTrue)
});

var isSearchTrue = !0;
$(".strip-search").click(function () {
    isSearchTrue ? ($(".search").addClass("open-menu").removeClass("close-search"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "49%"
    }, 1500, function () {
        $(".search-input").animate({
            top: "50%"
        }, 250)
    }), isSearchTrue = !isSearchTrue) : ($(".search").addClass("close-search").removeClass("open-menu"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "300%"
    }), isSearchTrue = !isSearchTrue)
});

//search by name Api fetch *multiple characters*//
async function search(byname) {
    $("#loadingSection").fadeIn(100, function(){
        $("#iconloader").fadeIn(100)
    })
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${byname}`)
    mealsByName = await meals.json()
    displayMeals(mealsByName.meals)
    $("#loadingSection").fadeOut(600, function(){
        $("#iconloader").fadeOut(500)
    })
    return mealsByName
} // done //
search("")

///display categories meals //
function displayCategories() {
        let e = ""
        for (var i = 0; i < dataContainer.length; i++) 
        e += `
        <div class="meal col-md-3 position-relative">
        <div onclick="filterByCategory('${dataContainer[i].strCategory}')" class="meal-container">
        <img  src='${dataContainer[i].strCategoryThumb}' class="w-100 rounded">
        <div class="layer   text-center ">
            <h2 class="fw-bold fs-1 text-center">${dataContainer[i].strCategory}</h2>
            <p class="fs-6 fw-bold" >${dataContainer[i].strCategoryDescription.split(" ").slice(0,12).join(" ")}</p>
        </div>
        </div>
    </div>`
        row.innerHTML = e
}//done


///display area cards //
function displayArea() {
    let bbox = ""
    for (let i = 0; i < dataContainer.length; i++) 
    bbox += `
    <div class="col-md-6 col-lg-3 my-3 area-container">
        <div class="rounded position-relative area-content">
            <div onclick=(filterByArea('${dataContainer[i].strArea}')) class="meal-container justify-content-center align-items-center flex-column d-flex ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white fw-bold fs-4">${dataContainer[i].strArea}</h2>
            </div>
        </div>
    </div>`
    row.innerHTML = bbox

}//done//

///display Ingredients cards //
function displayIngredients() {
    let bbox = ""
    for (let i = 0; i < dataContainer.length; i++) 
    bbox += `
    <div class="col-md-6 col-lg-3 my-3">
        <div onclick="getMainIngredient('${dataContainer[i].strIngredient}')" class="rounded position-relative">
            <div class="meal-container text-center">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${dataContainer[i].strIngredient}</h2>
                <p class="text-white">${dataContainer[i].strDescription.split(" ").splice(0,15).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = bbox
}//done//

//get one ingredients from API fetch 
async function getMainIngredient(mealName) {
    $("#loadingSection").fadeIn(100, function(){
        $("#iconloader").fadeIn(100)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    mealName = await response.json()
    displayMeals(mealName.meals)
    $("#loadingSection").fadeOut(600, function(){
        $("#iconloader").fadeOut(500)
    })
    

}//done//

//display meals
function displayMeals(dataContainer) {
    let meals = ""
    for (let i = 0; i < dataContainer.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3">
            <div onclick="getMeal('${dataContainer[i].idMeal}')" class="rounded position-relative">
                <div class="position-relative meal ">
                    <img src='${dataContainer[i].strMealThumb}' class="w-100 rounded" />
                    <div class=" d-flex align-items-center  ">
                        <div class="layer d-flex align-items-center text-center">
                            <h2>${dataContainer[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = meals
} //done//

//get meal by id fetch
async function getMeal(mealID) {
    $("#loadingSection").fadeIn(100, function(){
        $("#iconloader").fadeIn(100)
    })
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    mealById = await meal.json()
    displayMeal(mealById.meals[0])
    $("#loadingSection").fadeOut(600, function(){
        $("#iconloader").fadeOut(500)
    })

}//done

//display meal recipe, tags,source and youtube
function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `
            <li class="col-md-3 my-3 mx-1 p-1 alert alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",") 
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="col-md-3 my-3 mx-1 text-center p-1 alert alert-success rounded">${tags[i]}</li>` 
    }

    let str = `
    <div class="col-md-4  text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8  text-white text-left pb-4">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="row text-center align-items-center " id="recipes">
					</ul>
					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="row " id="tags">
					</ul>
					<a class="btn btn-success text-white fs-3 fw-bold" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube btn-danger text-white fs-3 fw-bold " target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr

}//done

//categoryData from API fetch
async function getCategories(NavList) {
    categoryData = await fetch(`https://www.themealdb.com/api/json/v1/1/${NavList}`);
    categoryData = await categoryData.json()
    return categoryData;

}//done

//search by only 1 letter from Api fetch
async function getByLetter(letter) {
    if (letter) {
        $("#loadingSection").fadeIn(100, function(){
        $("#iconloader").fadeIn(100)
    })

        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $("#loadingSection").fadeOut(600, function(){
        $("#iconloader").fadeOut(500)
    })

    }
}//done

//filter meals by category API fettch
async function filterByCategory(category) {
    $("#loadingSection").fadeIn(100, function(){
        $("#iconloader").fadeIn(100)
    })
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $("#loadingSection").fadeOut(600, function(){
        $("#iconloader").fadeOut(500)
    })

}//done

//fiylter by cities API fetch
async function filterByArea(area) {
    $("#loadingSection").fadeIn(100, function(){
        $("#iconloader").fadeIn(100)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    cityMeals = await response.json()
    displayMeals(cityMeals.meals.slice(0, 20))
    $("#loadingSection").fadeOut(600, function(){
        $("#iconloader").fadeOut(500)
    })

}//done

//nav item click
$(".nav-item a").click(async (e) => {
    let NavList = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    if (NavList == "contact") {
        row.innerHTML = `
        <section id="contact" class="container  w-75 mx-auto mb-5 text-center">
		<div class="p-2 " id="contactContent">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row g-4">
			<div class="col-md-6">
			<div class="form-group">
				<input class="form-control bg-dark text-white " onkeyup="validation()" id="name"  placeholder="Enter Your Name">
						<div class="alert alert-danger mt-1 d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
		<div class="col-md-6">
			<div class="form-group">
				<input onkeyup="validation()" class="form-control bg-dark text-white" id="email" placeholder="Enter Email">
				<div class="alert alert-danger mt-1 d-none" id="emailalert" role="alert">
 				Enter valid email. *Ex: xxx@yyy.zzz
				</div>
                    </div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark text-white" id="phone" placeholder="Enter phone">					
                    <div class="alert alert-danger mt-1  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input type="number" onkeyup="validation()" class="form-control bg-dark text-white" id="age" placeholder="Enter Age">
						<div class="alert alert-danger mt-1  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark text-white" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert alert-danger mt-1   d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark text-white" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert alert-danger mt-1  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn"  class="mt-5 btn btn-outline-danger">Submtit</button>
		</div>

        <div class="confirm mt-3 alert alert-success d-none" id="confirmMsg">
        <h2 class="fs-3">Thanks for contacting us! We will be in touch with you shortly via Email </h2>
        </div>


	</section>`



    ///validation
        userName = document.getElementById("name"),
            userEmail = document.getElementById("email"),
            userPhone = document.getElementById("phone"),
            userAge = document.getElementById("age"),
            userPassword = document.getElementById("password"),
            userRePassword = document.getElementById("rePassword"),
            userNameAlert = document.getElementById("namealert"),
            userEmailAlert = document.getElementById("emailalert"),
            userPhoneAlert = document.getElementById("phonealert"),
            userAgeAlert = document.getElementById("agealert"),
            userpasswordAlert = document.getElementById("passwordalert"),
            userRepasswordAlert = document.getElementById("repasswordalert");
            submitBtn = document.getElementById("submitBtn")

        userName.addEventListener("focus", () => {
            nameField = true
        })
        userEmail.addEventListener("focus", () => {
            emailField = true
        })
        userPhone.addEventListener("focus", () => {
            phoneField = true
        })
        userAge.addEventListener("focus", () => {
            ageField = true
        })
        userPassword.addEventListener("focus", () => {
            passwordField = true
        })
        userRePassword.addEventListener("focus", () => {
            repasswordField = true
        })


///confirm submit msg // 
        $(document).on("click","#submitBtn", function() {
            document.getElementById("confirmMsg").classList.replace("d-none","d-block")
            document.getElementById("contactContent").classList.add("d-none")
        console.log("confirmd")
        });
        

    }


    if (NavList == "search") {   
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="d-flex justify-content-between gx-2 pb-4">
        <input type="search" value="" placeholder="Search By Name..." id="nameInput" class="search-input w-50 me-2">
        <input type="search" value="" placeholder="Search By First Letter..." id="searchLetterInput"class="search-input w-50 ms-2">
        </div>`

        $("#nameInput").keyup((e) => {
            search(e.target.value)
        })
        $("#searchLetterInput").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#searchLetterInput').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }


    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);

    let categoryData;

    if (NavList == "categories") {
        $("#loadingSection").fadeIn(100, function(){
            $("#iconloader").fadeIn(100)
        })
        categoryData = await getCategories(NavList + ".php")
        dataContainer = categoryData.categories.splice(0, 20);
        displayCategories()
        $("#loadingSection").fadeOut(600,function(){
            $("#iconloader").fadeOut(500)

        })

    } else if (NavList == "Area") {
        $("#loadingSection").fadeIn(100, function(){
            $("#iconloader").fadeIn(100)
        })
        categoryData = await getCategories("list.php?a=list")
        dataContainer = categoryData.meals.splice(0, 20);
        displayArea()
        $("#loadingSection").fadeOut(600,function(){
            $("#iconloader").fadeOut(500)

        })
    } else if (NavList == "Ingredients") {
        $("#loadingSection").fadeIn(100, function(){
            $("#iconloader").fadeIn(100)
        })
        categoryData = await getCategories("list.php?i=list")
        dataContainer = categoryData.meals.splice(0, 20);
        displayIngredients()
        $("#loadingSection").fadeOut(600,function(){
            $("#iconloader").fadeOut(500)

        })

    }
})//done

// regex validation 
function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}//name

function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}//email

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}//phone

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}//age

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}//password

function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}//repassword

// form inputs default stute
let nameField = false,
    emailField = false,
    phoneField = false,
    ageField = false,
    passwordField = false,
    repasswordField = false;
/// validation function conditions + action//
function validation() {

    if (nameField) {
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailField) {
        if (userEmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phoneField) {
        if (userPhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (ageField) {
        if (userAgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordField) {
        if (userPasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordField) {
        if (userRePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        submitBtn.removeAttribute("disabled")
        submitBtn.classList.remove("btn-outline-danger")
        submitBtn.classList.add("btn-outline-success", "fs-5" , "fw-bold")
        
    }else{
        submitBtn.setAttribute("disabled","true")
    }

}//done





