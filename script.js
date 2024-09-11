// Predefined users: 1 admin, 3 restaurants, 2 customers
const users = [
    { email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
    { email: 'restaurant1@gmail.com', password: 'rest123', role: 'restaurant' },
    { email: 'restaurant2@gmail.com', password: 'rest123', role: 'restaurant' },
    { email: 'restaurant3@gmail.com', password: 'rest123', role: 'restaurant' },
    { email: 'customer1@gmail.com', password: 'cust123', role: 'customer' },
    { email: 'customer2@gmail.com', password: 'cust123', role: 'customer' }
];

// Registered users through signup
let registeredUsers = [];

// Function to show the signup form and hide the login form
function showSignupScreen() {
    document.getElementById('loginForm').style.display = 'none'; // Hide login form
    document.getElementById('signupForm').style.display = 'block'; // Show signup form
}

// Function to show the login form and hide the signup form
function showLoginScreen() {
    document.getElementById('signupForm').style.display = 'none'; // Hide signup form
    document.getElementById('loginForm').style.display = 'block'; // Show login form
}

// Simulated login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check predefined users and registered users
    const user = [...users, ...registeredUsers].find(user => user.email === email && user.password === password);

    if (user) {
        document.getElementById('loginMessage').style.color = 'green';
        document.getElementById('loginMessage').innerText = `Login successful! Redirecting to ${user.role} page...`;

        setTimeout(() => {
            if (user.role === 'admin') {
                showAdminPanel();
            } else if (user.role === 'customer') {
                showCustomerPanel();
            }
        }, 1500);
    } else {
        document.getElementById('loginMessage').style.color = 'red';
        document.getElementById('loginMessage').innerText = 'Invalid email or password.';
    }
}

// Simulated signup function
function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Simple password confirmation check
    if (password === confirmPassword) {
        const newUser = { email, password, role: 'customer' }; // Default role for signup is customer
        registeredUsers.push(newUser);

        document.getElementById('signupMessage').style.color = 'green';
        document.getElementById('signupMessage').innerText = 'Account registered successfully! You can now login.';

        setTimeout(() => {
            showLoginScreen(); // Automatically show login form after signup
        }, 1500);
    } else {
        document.getElementById('signupMessage').style.color = 'red';
        document.getElementById('signupMessage').innerText = 'Passwords do not match.';
    }
}

// Admin Panel functionality
function showAdminPanel() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';

    displayUsers();
}

function displayUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    [...users, ...registeredUsers].forEach((user, index) => {
        if (user.role !== 'admin') {
            const userElement = document.createElement('div');
            userElement.innerHTML = `${user.email} (${user.role}) 
            <button onclick="removeUser(${index})">Remove</button>`;
            usersList.appendChild(userElement);
        }
    });
}

function removeUser(index) {
    if (index < users.length) {
        console.error('Cannot remove predefined users');
    } else {
        registeredUsers.splice(index - users.length, 1);
        displayUsers();
    }
}

// Customer Panel functionality
const restaurants = [
    {
        name: "Butt Rest 1",
        dishes: [
            { name: "Pasta", price: 100 },
            { name: "Burger", price: 150 },
        ]
    },
    {
        name: "Suffi Rest 2",
        dishes: [
            { name: "Pizza", price: 200 },
            { name: "Shawarma", price: 250 },
        ]
    },
    {
        name: "Shanwari Rest 3",
        dishes: [
            { name: "Biryani", price: 180 },
            { name: "Kebab", price: 220 },
        ]
    }
];

let cart = [];

function showCustomerPanel() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('customerPanel').style.display = 'block';

    displayRestaurants();
}

function displayRestaurants() {
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant, index) => {
        const restaurantElement = document.createElement('div');
        restaurantElement.innerHTML = `<h4>${restaurant.name}</h4>`;
        
        restaurant.dishes.forEach((dish, dishIndex) => {
            const dishElement = document.createElement('p');
            dishElement.innerHTML = `${dish.name} - ₨${dish.price} 
            <button onclick="addToCart(${index}, ${dishIndex})">Add to Cart</button>`;
            restaurantElement.appendChild(dishElement);
        });

        restaurantList.appendChild(restaurantElement);
    });
}

function addToCart(restaurantIndex, dishIndex) {
    const dish = restaurants[restaurantIndex].dishes[dishIndex];
    cart.push(dish);
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('p');
        itemElement.innerHTML = `${item.name} - ₨${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartElement.appendChild(itemElement);
    });
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `Total: ₨${total}`;
    cartElement.appendChild(totalElement);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Your order has been placed and will be delivered in 45 minutes.');
        cart = []; // Clear the cart after placing the order
        updateCart();
    }
}
