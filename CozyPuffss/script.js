const ACCOUNTS = {
  "user@gmail.com": { password: "user12345", role: "user", redirect: "profile.html" },
  "admin@gmail.com": { password: "admin12345", role: "admin", redirect: "admin-dashboard.html" },
  "superadmin@gmail.com": { password: "superadmin12345", role: "superadmin", redirect: "sales-report.html" }
};

const PRODUCTS = {
  croissant: { name: "Croissant", price: 120, img:"croissant.png" },
  churros: { name: "Churros", price: 110, img:"churros.png" },
  eclair: { name: "Éclair", price: 125, img:"eclair.png" },
  cinnamon: { name: "Cinnamon Roll", price: 150, img:"cinnamon-roll.png" },
  glazed_cinnamon: { name: "Glazed Cinnamon Roll", price: 170, img:"glazed-cinnamon-roll.png" },
  cream_puff: { name: "Cream Puff", price: 99, img:"cream-puff.png" },
  milk_bread: { name: "Milk Bread", price: 120, img:"milk-bread.png" },
  cheese_roll: { name: "Cheese Roll", price: 95, img:"cheese-roll.png" },
  butter_bread: { name: "Butter Bread", price: 100, img:"butter-bread.png" },
  ensaymada: { name: "Ensaymada", price: 130, img:"ensaymada.png" },
  cream_cheese: { name: "Cream Cheese", price: 145, img:"cream-cheese.png" },
  pistachio_puff: { name: "Pistachio Puff", price: 170, img:"pistachio-puff.png" },
  red_velvet: { name: "Red Velvet Cake", price: 320, img:"red-velvet.png" },
  carrot_cake: { name: "Carrot Cake", price: 290, img:"carrot-cake.png" },
  vanilla_cake: { name: "Vanilla Cake", price: 270, img:"vanilla-cake.png" },
  banana_cake: { name: "Banana Cake", price: 240, img:"banana-cake.png" },
  chiffon_cake: { name: "Chiffon Cake", price: 260, img:"chiffon-cake.png" },
  black_forest: { name: "Black Forest Cake", price: 350, img:"black-forest.png" }
};

function loginUser(){
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();
  const error=document.getElementById("error-message");
  const acc=ACCOUNTS[email];

  if(!acc || acc.password!==password){
    error.textContent="Invalid email or password.";
    return;
  }

  localStorage.setItem("cozyRole",acc.role);
  localStorage.setItem("cozyEmail",email);
  window.location.href=acc.redirect;
}

function togglePassword(){
  const p=document.getElementById("password");
  p.type=p.type==="password"?"text":"password";
}

function protectPage(role){
  if(localStorage.getItem("cozyRole")!==role){
    alert("Please sign up or login first.");
    window.location.href="login.html";
  }
}

function logout(){
  localStorage.removeItem("cozyRole");
  localStorage.removeItem("cozyEmail");
  window.location.href="index.html";
}

function requireLoginThenProduct(key){
  localStorage.setItem("currentProduct",key);

  if(localStorage.getItem("cozyRole")!=="user"){
    showLoginModal();
  }else{
    window.location.href="product.html";
  }
}

function showLoginModal(){
  let modal = document.getElementById("login-modal");

  if(!modal){
    modal = document.createElement("div");
    modal.id = "login-modal";
    modal.className = "login-modal";
    modal.innerHTML = `
      <div class="login-modal-card">
        <button class="modal-close" onclick="closeLoginModal()">×</button>
        <img src="logo.png" alt="Cozy Puffs Logo">
        <h2>Please Sign up / Log in first</h2>
        <p>so you can experience the real treat.</p>
        <div class="modal-actions">
          <a class="btn" href="login.html">Sign up / Log in</a>
          <button onclick="closeLoginModal()">Maybe Later</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.classList.add("show");
}

function closeLoginModal(){
  const modal = document.getElementById("login-modal");
  if(modal){
    modal.classList.remove("show");
  }
}

function getCart(){return JSON.parse(localStorage.getItem("cozyCart"))||[]}
function saveCart(cart){localStorage.setItem("cozyCart",JSON.stringify(cart));updateCartCount()}

function updateCartCount(){
  const count=document.getElementById("cart-count");
  if(count){
    const cart=getCart();
    count.textContent=cart.reduce((sum,item)=>sum+item.qty,0);
  }
}

function loadProduct(){
  protectPage("user");
  const key=localStorage.getItem("currentProduct")||"cinnamon";
  const p=PRODUCTS[key];

  document.getElementById("product-img").src=p.img;
  document.getElementById("product-name").textContent=p.name;
  document.getElementById("product-price").textContent="₱"+p.price+".00 PHP";
  document.getElementById("add-product").onclick=()=>addToCart(key);
}

function addToCart(key){
  const p=PRODUCTS[key]||PRODUCTS.cinnamon;
  const qty=Number(document.getElementById("qty")?.value||1);
  const cart=getCart();

  const existing=cart.find(item=>item.name===p.name);
  if(existing){existing.qty+=qty}
  else{cart.push({name:p.name,price:p.price,qty,img:p.img})}

  saveCart(cart);
  alert(p.name+" added to cart.");
}

function displayCart(){
  protectPage("user");
  const box=document.getElementById("cart-items");
  const totalBox=document.getElementById("cart-total");
  if(!box)return;

  const cart=getCart();
  let total=0;
  box.innerHTML="";

  if(cart.length===0){
    box.innerHTML="<p class='small-note'>Your cart is empty.</p>";
  }

  cart.forEach(item=>{
    const sub=item.price*item.qty;
    total+=sub;
    box.innerHTML+=`<div class="cart-row"><span>${item.name} x ${item.qty}</span><strong>₱${sub}</strong></div>`;
  });

  totalBox.textContent="Total: ₱"+total;
  updateCartCount();
}

function clearCart(){
  localStorage.removeItem("cozyCart");
  displayCart();
}

function displayOrderTotal(){
  protectPage("user");
  const cart=getCart();
  const total=cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  document.getElementById("order-total").textContent="Total: ₱"+total;
  updateCartCount();
}

function completeTransaction(){
  protectPage("user");
  localStorage.removeItem("cozyCart");
}

function fakeAction(msg){alert(msg)}

function hideLoader(){
  const loader=document.getElementById("loader");
  if(loader){
    setTimeout(()=>loader.classList.add("hide"),1800);
  }
}

document.addEventListener("DOMContentLoaded",updateCartCount);

/* REVIEW CAROUSEL */
let currentReviewSlide = 0;

function moveReviewSlide(index){
  const track = document.getElementById("review-track");
  const dots = document.querySelectorAll(".review-dot");

  if(!track) return;

  currentReviewSlide = index;
  track.style.transform = `translateX(-${index * 50}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  if(dots[index]) dots[index].classList.add("active");
}

function autoReviewCarousel(){
  const track = document.getElementById("review-track");
  if(!track) return;

  setInterval(()=>{
    currentReviewSlide = (currentReviewSlide + 1) % 2;
    moveReviewSlide(currentReviewSlide);
  },5000);
}

document.addEventListener("DOMContentLoaded", autoReviewCarousel);


PRODUCTS.ensaymada = { name: "Ensaymada", price: 130, img: "ensaymada.png" };
PRODUCTS.carrot_cake = { name: "Carrot Cake", price: 290, img: "carrot-cake.png" };
PRODUCTS.black_forest = { name: "Black Forest Cake", price: 350, img: "black-forest.png" };
