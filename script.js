function likefunc(e) {
    e = e.split(" ").join("_");
    let result = document.getElementById(`${"like-button-" + e}`);
    if (result.style.color == "black") {
        result.style.color = "red";
    } else {
        result.style.color = "black";
    }
}

document.addEventListener('DOMContentLoaded', function () {

    //---------------------------------- fetching data from json file------------------------------//
    fetch('./data.json').then((data) => {
        return data.json();
    }).then((completedata) => {
        let data1 = "";
        completedata.map((val) => {
            data1 += `<div class="card p-2" data-category="${val.type}" data-rating="${val.rating}">
                <img src=${val.imageSrc} class="recipe-img" alt="img">
                    <div class="card-body">
                        <span class="type">${val.type}</span>

                        <div class="recipe-info d-flex justify-content-between">
                            <h4 class="name">${val.name}</h4>
                            
                            <p class="rating"><i class="fa-solid fa-star" style="color: #fdc040;"></i> ${val.rating}</p>
                        </div>
                        <div class="del-time d-flex justify-content-between">
                            <h5 class="time">${val.time}</h5>
                            
                            <div class="like-com">
                                <button id="likebtn" class="liked" onclick="likefunc('${val.name}')"><i id="${`like-button-` + val.name.split(" ").join("_")}" class="fa-regular fa-heart fa-lg like-btn" style="color:black" ></i></button>

                                <span class="comment"><i class="fa-regular fa-comment fa-lg" style="color: #000000;"></i></span>
                            </div>
                            </div>
                        </div>
                    </div>`
        });

        document.getElementById("recipeCards").innerHTML = data1;
    }).catch((err) => {
        console.log(err);
    });

    //---------------------------- Function to filter recipes by name ---------------------------//
    function filterRecipesByName(searchQuery) {
        // Get all recipe cards
        const recipeCards = document.querySelectorAll(".card");

        recipeCards.forEach((card) => {
            const name = card.querySelector(".name").textContent.toLowerCase();
            if (name.includes(searchQuery.toLowerCase())) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    //------------------------------- Function to clear search results and display all cards------------------------------------------//
    function clearSearchResults() {

        document.getElementById("searchInput").value = "";

        filterRecipesByName("");
    }

    //----------------------------- Add an event listener to the search button ---------------------------//
    const searchBar = document.getElementById("searchInput");

    searchBar.addEventListener("keyup", function () {
        const searchQuery = document.getElementById("searchInput").value.trim();

        filterRecipesByName(searchQuery);
    });

    const searchBtn = document.getElementById("button-addon2");

    searchBtn.addEventListener("keyup", function () {

        const searchQuery = document.getElementById("searchInput").value.trim();

        filterRecipesByName(searchQuery);
    });

    document.getElementById("searchInput").addEventListener("input", function () {

        const searchQuery = this.value.trim();

        if (searchQuery === "") {
            clearSearchResults();
        }
    });


    //------------------------------------- all, veg and nonveg button filters ----------------------------------------//

    const All = document.getElementById('all');
    const Veg = document.getElementById('veg');
    const nonVeg = document.getElementById('non-veg');

    All.addEventListener("click", () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.style.display = 'flex';
        });
    });

    All.click();

    Veg.addEventListener("click", () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const show = category === 'veg';
            card.style.display = show ? 'flex' : 'none';
        });
    });

    nonVeg.addEventListener("click", () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const show = category === 'non-veg';
            card.style.display = show ? 'flex' : 'none';
        });
    });

    //--------------------------------- Function to filter recipes by rating ------------------------------- //
    function filterRecipesByRating(above4, below4) {

        const recipeCards = document.querySelectorAll(".card");

        recipeCards.forEach((card) => {
            const rating = parseFloat(card.getAttribute("data-rating"));

            if ((above4 && rating >= 4) || (below4 && rating < 4)) {
                card.style.display = "flex";
            } else if (!above4 && !below4) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    document.getElementById("4andabove").addEventListener("change", function () {

        const above4 = this.checked;

        const below4 = document.getElementById("below4").checked;

        filterRecipesByRating(above4, below4);
    });

    document.getElementById("below4").addEventListener("change", function () {

        const above4 = document.getElementById("4andabove").checked;

        const below4 = this.checked;

        filterRecipesByRating(above4, below4);
    });

});
