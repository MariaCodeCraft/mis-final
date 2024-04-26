async function searchMeal() {
    const searchInput = document.getElementById('searchInput').value;
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = '';

    if (searchInput.trim() === '') {
        alert('Please enter a meal name');
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();

        if (data.meals === null) {
            alert('No meals found. Please try another search term.');
            return;
        }

        const meals = data.meals.slice(0, 5);

        meals.forEach((meal, index) => {
            const mealBox = document.createElement('div');
            mealBox.classList.add('meal-box');

            const mealSection = document.createElement('section');
            mealSection.classList.add('meal-section');

            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal');
            mealDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-details">
                    <h2>${index + 1}. ${meal.strMeal} - ${meal.strCategory}</h2>
                    <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                    <p><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
                </div>
            `;

            mealSection.appendChild(mealDiv);
            mealBox.appendChild(mealSection);
            mealContainer.appendChild(mealBox);
        });

        if (data.meals.length > 5) {
            const showAllButton = document.createElement('button');
            showAllButton.textContent = 'SHOW ALL';
            showAllButton.addEventListener('click', () => {
                mealContainer.innerHTML = '';
                data.meals.forEach((meal, index) => {
                    const mealBox = document.createElement('div');
                    mealBox.classList.add('meal-box');

                    const mealSection = document.createElement('section');
                    mealSection.classList.add('meal-section');

                    const mealDiv = document.createElement('div');
                    mealDiv.classList.add('meal');
                    mealDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-details">
                            <h2>${index + 1}. ${meal.strMeal} - ${meal.strCategory}</h2>
                            <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                            <p><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
                        </div>
                    `;

                    mealSection.appendChild(mealDiv);
                    mealBox.appendChild(mealSection);
                    mealContainer.appendChild(mealBox);
                });
            });
            mealContainer.appendChild(showAllButton);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again later.');
    }
}








          

