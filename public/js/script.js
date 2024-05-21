document.addEventListener('DOMContentLoaded', function () {
    const time = document.getElementById('time');
    const date = document.getElementById('date');

    const formatDate = (dateObj) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    };

    const updateTime = () => {
        const now = new Date();
        time.innerHTML = now.toLocaleTimeString();
        date.innerHTML = formatDate(now);
    };

    updateTime();
    setInterval(updateTime, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/foods')
        .then(response => response.json())
        .then(data => {
            displayFoods(data);

            const searchInput = document.getElementById('search');
            searchInput.addEventListener('input', () => {
                const searchQuery = searchInput.value.toLowerCase();
                filterFoods(data, searchQuery);
            });
        })
        .catch(error => console.error('Error fetching foods:', error));
});

function displayFoods(foods) {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';

    foods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';

        foodItem.innerHTML = `
            <img src="${food.image}" alt="${food.name}" class="food-image">
            <div class="food-details">
                <h3 class="food-name">${food.name}</h3>
                <p class="food-price">$${food.price}</p>
            </div>
        `;

        foodList.appendChild(foodItem);
    });
}

function filterFoods(foods, query) {
    const filteredFoods = foods.filter(food => food.name.toLowerCase().includes(query));
    displayFoods(filteredFoods);
}