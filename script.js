document.addEventListener('DOMContentLoaded', function () {
    // fetching data from json file
    fetch('./data.json').then((data) => {
        return data.json();
    }).then((completedata) => {
        let data1 = "";
        completedata.map((val) => {
            data1 += `<div class="card p-2" data-category="${val.type}">
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
                                <button id="likebtn" class="liked"><i class="fa-regular fa-heart fa-lg" style="color: #000000;"></i></button>

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

});

//all, veg and nonveg button filters
    const All = document.getElementById('all');
    const Veg = document.getElementById('veg');
    const nonVeg = document.getElementById('non-veg');

    All.addEventListener("click", () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.style.display = 'flex';
        });
    });

    // Simulate a click on the "All" button when the page loads
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

