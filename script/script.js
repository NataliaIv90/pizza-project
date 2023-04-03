const themeBtn = document.querySelector(".header__themeIcon"),
  menuTitles = document.querySelectorAll(".menu__itemTitle"),
  menuItems = document.querySelectorAll(".menu__item"),
  menuSelectAllBtn = document.querySelector(".menu__selectAllBtn"),
  menuNavItems = document.querySelectorAll(".menu__navItem"),
  menuSelectAmountContainers = document.querySelectorAll(".menu__selectAmountContainer"),
  reviewCards = document.querySelector(".review__cards"),
  reviewSliderLeftBtn = document.querySelector("#review__bracketLeft"),
  reviewSliderRightBtn = document.querySelector("#review__bracketRight"),
  staffCards = document.querySelector(".staff__cards"),
  constrImages = document.querySelectorAll(".constructor__img"),
  constrImagesSelector = document.querySelectorAll(".constructor__imgOption"),
  constructorBillValue = document.querySelector(".constructor__formTotalBill"),
  constrPizzaSouce = document.querySelectorAll(".constructor__pizzaSouce"),
  constrPizzaIngred = document.querySelectorAll(".constructor__pizzaIngred"),
  constrPizzaSize = document.querySelectorAll(".constructor__pizzaSize"),
  customPizzaForm = document.querySelector("#constructor__customPizza"),
  customPizzaFormBtn = document.querySelector(".constructor__addToCartBtn"),
  priceItemVal = document.querySelectorAll(".constructor__selectedItemValue");
let reviewCardVisibleIndex = 0,
  cart = [];

document.getElementById("header__couponsPrompt").addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({
    title: '-30% OFF!',
    text: 'Enter "happy" in the cart and get -30% on your order',
    confirmButtonText: 'Ok'
  })
})

const menuBackgroundImages = {
  "Pizza Margarita": '01-margarita',
  "Basil Pizza": '01-basil',
  "Mediterrian Pizza": '01-mediterrian',
  "Olive Pizza": '01-olive',
  "Salami Pizza": '01-salami',
  "Chicken with orange souce": '02-chichen',
  "Shrimps curry": '02-curry',
  "Meat dumplings": '02-dumplings',
  "Chicken nuggets": '02-nuggets',
  "Mediterrian soup": '02-soup',
  "Grilled steak": '02-steak',
  "Tom Yum": '02-tomyum',
  "Espresso": '03-coffee',
  "Black tea": '03-tea',
  "Margarita": '03-margarita',
  "Mohito": '03-mohito',
  "Forest Berry Ice cream": '04-1',
  "Vanilla and Chocolate ice cream": '04-2',
  "All-in-one ice cream": '04-3',
  "Chocolate ice cream": '04-4',
  "default": "default"

}

function increaseAmount() {
  this.nextElementSibling.innerText = this.nextElementSibling.innerText * 1 + 1;
}

function decreaseAmount() {
  if (this.previousElementSibling.innerText * 1 > 1) {
    this.previousElementSibling.innerText = this.previousElementSibling.innerText * 1 - 1;
  }
}

menuSelectAmountContainers.forEach(el => {
  el.innerHTML = `      <div class="menu__changeAmountBtn menu__increaseAmount">+</div>
                <div class="menu__amount">1</div>
                <div class="menu__changeAmountBtn menu__decreaseAmount">-</div>`;
})

let increaseBtn = document.querySelectorAll(".menu__increaseAmount");
let decreaseBtn = document.querySelectorAll(".menu__decreaseAmount");

increaseBtn.forEach(el => {
  el.addEventListener("click", increaseAmount);
})

decreaseBtn.forEach(el => {
  el.addEventListener("click", decreaseAmount);
})

themeBtn.addEventListener("click", toggleTheme);
function toggleTheme() {
  this.classList.toggle("header__dayThemeIcon");
  arr = ["header", "menu", "constructor", "review", "delivery", "footer"];
  for (let i = 0; i < arr.length; i++) {
    document.querySelector(`.${arr[i]}`).classList.toggle("dark-theme");
  }

  document.body.classList.toggle("dark-bg");
  document.querySelector(".constructor__title").classList.toggle("dark-theme");
  document.querySelector(".menu__title").classList.toggle("dark-theme");
  document.querySelector(".footer__subscribeInput").classList.toggle("dark-bg");
  document.querySelector(".footer__subscribeInput").classList.toggle("dark-theme");
  document.querySelectorAll(".menu__amount").forEach(el => {
    el.classList.toggle("dark-theme");
  })
}

menuTitles.forEach(el => {
  const key = el.innerText;
  // console.log(key);
  // console.log(menuBackgroundImages[key]);
  if (menuBackgroundImages[key]) {
    el.parentElement.previousElementSibling.style.backgroundImage = `url("./img/menu/${menuBackgroundImages[key]}.png")`;
  } else {
    el.parentElement.previousElementSibling.style.backgroundImage = `url("./img/menu/${menuBackgroundImages.default}.png")`;
  }
})

menuNavItems.forEach(el => {
  el.addEventListener("click", displayMenuDiv);
})

function displayMenuDiv() {
  menuNavItems.forEach(el => {
    el.classList.remove("selected");
  })
  this.classList.add("selected");
  let dataTag = this.getAttribute("data-tag");
  menuItems.forEach(el => {
    if (el.classList.contains(dataTag)) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");

    }
  })
  menuSelectAllBtn.classList.remove("hidden");
}

menuSelectAllBtn.addEventListener("click", () => {
  menuItems.forEach(el => {
    el.classList.remove("hidden");
  });
  menuSelectAllBtn.classList.add("hidden");
  menuNavItems.forEach(el => {
    el.classList.remove("selected");
  })
})

// Конструктор піцци
const constructorElPrice = {
  "01-30cm": 5,
  "01-40cm": 8,
  "01-50cm": 12,
  "02-bbq": 6,
  "02-pesto": 7,
  "02-tomato": 5,
  "02-white": 8,
  "03-bacon": 4,
  "03-salami": 3,
  "04-broccoli": 2,
  "04-mushrooms": 3,
  "04-pineapples": 2,
  "04-tomatoes": 1,
  "06-black-olives": 1,
  "05-green-peppers": 1,
  "05-onions": 1,
  "06-spinach": 1
}

function updateTotalPrice() {
  let sum = 0;
  document.querySelectorAll(".constructor__selectedItemValue").forEach(el => {
    sum += el.innerText * 1;
  })
  document.querySelector(".constructor__totalPriceValue").innerText = `${sum}`;
}

constrPizzaSouce.forEach(el => { el.addEventListener("click", updateSouce); });


function updateSouce() {
  let id = this.getAttribute("data-name");
  document.querySelector(".constructor__billItemSouce").innerHTML = `
    <div class="constructor__billItemName">${this.nextElementSibling.innerText}</div>
    <div>$<span class="constructor__selectedItemValue">${constructorElPrice[id]}</span></div>`
  updateTotalPrice();
}

constrPizzaSize.forEach(el => { el.addEventListener("click", updateSize); });

function updateSize() {
  let id = this.getAttribute("data-name");
  document.querySelector(".constructor__billItemSize").innerHTML = `
    <div class="constructor__billItemName">Pizza size ${this.nextElementSibling.innerText}</div>
    <div>$<span class="constructor__selectedItemValue">${constructorElPrice[id]}</span></div>`
  updateTotalPrice();
}

constrPizzaIngred.forEach(el => {
  el.addEventListener("click", addIngredient);
  el.addEventListener("click", toggleImage);
})

constrImagesSelector.forEach(el => {
  el.addEventListener("click", toggleImage);
})

function toggleImage() {
  for (let i = 1; i < constrImages.length; i++) {
    constrImages[i].classList.add("hidden");
  }
  constrImagesSelector.forEach(el => {
    // if (el.checked) {
    constrImages.forEach(imgEl => {
      if (el.checked && imgEl.getAttribute("data-name") == el.getAttribute("data-name")) {
        imgEl.classList.remove("hidden");
      }
    })
    // }
  })
}

function addIngredient() {
  if (this.checked) {
    let li = document.createElement("li");
    li.classList.add("constructor__billItem");
    let id = this.getAttribute("data-name");
    li.classList.add("constructor__billItem");
    li.setAttribute("id", id);
    li.innerHTML = `<div class="constructor__billItemName">${this.nextElementSibling.innerText}</div>
                  <div>$<span class="constructor__selectedItemValue">${constructorElPrice[id]}</span></div>`
    constructorBillValue.insertAdjacentElement("beforeend", li);
    updateTotalPrice();
  } else {
    let id = this.getAttribute("data-name");
    console.log(id);
    document.getElementById(id).remove();
    updateTotalPrice();
  }
}

customPizzaFormBtn.addEventListener("click", submitCustomPizza);
customPizzaForm.addEventListener("submit", submitCustomPizza);

function submitCustomPizza(e) {
  e.preventDefault();
  let ingredients = [];
  let ingredientsList = document.querySelectorAll(".constructor__billItemName");
  ingredientsList.forEach(el => {
    ingredients.push(el.innerText);

  });
  ingredients = `CUSTOM pizza (${ingredients.join(" / ")})`;
  console.log(ingredients);
  let customPizza = [ingredients, document.querySelector(".constructor__totalPriceValue").innerText, 1];
  cart.push(customPizza);
  customPizzaForm.reset();

  constructorBillValue.innerHTML = ` 
      <li class="constructor__billItemSize">
        <div class="constructor__billItemName">Pizza size 30cm</div>
        <div>$<span class="constructor__selectedItemValue">6</span></div>
      </li>
      <li class="constructor__billItemSouce">
        <div class="constructor__billItemName">BBQ sauce</div>
        <div>$<span class="constructor__selectedItemValue">6</span></div>
      </li>`


  constrImages[1].classList.remove("hidden");
  for (let i = 2; i < constrImages.length; i++) {
    constrImages[i].classList.add("hidden");
  }
  updateTotalPrice();
}

// Добавляю відгуки в розділ review

let reviewArr = [
  {
    img: "./img/review/1.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta, minima esse harum amet magni quidem unde expedita quia ipsam eveniet iure!",
    name: "Courtney Henry",
    rate: 4
  },
  {
    img: "./img/review/2.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta, minima esse harum amet magni quidem unde expedita quia ipsam eveniet nostrum enim saepe exercitationem similique iure!",
    name: "Ariene McCoy",
    rate: 5
  },
  {
    img: "./img/review/3.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta!",
    name: "Ferenz Orli",
    rate: 4
  }, {
    img: "./img/review/4.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta, minima esse harum amet magni quidem unde expedita quia ipsam eveniet iure!",
    name: "Jim Henry",
    rate: 5
  },
  {
    img: "./img/review/5.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta, minima esse harum amet magni quidem unde expedita quia ipsam eveniet nostrum enim saepe exercitationem similique iure!",
    name: "Hitch Drum",
    rate: 5
  },
  {
    img: "./img/review/6.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta!",
    name: "Carmen Oli",
    rate: 3
  }
];

for (let i = 0; i < reviewArr.length; i++) {
  reviewCards.insertAdjacentHTML("beforeend", `
    <div class="review__card hidden">
      <img class="review__cardImg" src="${reviewArr[i].img}" alt="">
        <p class="review__cardText">${reviewArr[i].text}</p>
        <div class="review__cardTitle">
          ${reviewArr[i].name}
          <div class="review__cardStarRate">
            <div class="review__cardStarContainer"></div>
            <div class="review__cardStarContainer"></div>
            <div class="review__cardStarContainer"></div>
            <div class="review__cardStarContainer"></div>
            <div class="review__cardStarContainer"></div>
          </div>
        </div>

      </div >

  `
  )
}


// Розблю сірими зірки, щоб показати рейтинг нижчий за 5

const cardStarRateDiv = document.querySelectorAll(".review__cardStarRate");
for (let i = 0; i < cardStarRateDiv.length; i++) {
  if (reviewArr[i].rate < 5) {
    for (let j = 4; j > reviewArr[i].rate - 1; j--) {
      cardStarRateDiv[i].children[j].classList.add("review__cardGreyStarContainer");;
    }
  }
}

reviewCards.children[0].classList.remove("hidden");
reviewCards.children[1].classList.remove("hidden");


// .reviewCards
reviewSliderLeftBtn.addEventListener("click", showPreviousCard);
reviewSliderRightBtn.addEventListener("click", showNextCard);


function showNextCard() {
  reviewCards.classList.remove("flex-reverse");
  reviewCardVisibleIndex + 1 == reviewCards.children.length ?
    reviewCardVisibleIndex = 0 :
    reviewCardVisibleIndex += 1;


  for (let i = 0; i < reviewCards.children.length; i++) {
    reviewCards.children[i].classList.add("hidden");
  }

  reviewCards.children[reviewCardVisibleIndex].classList.remove("hidden");
  if (reviewCardVisibleIndex + 1 == reviewCards.children.length) {
    reviewCards.children[0].classList.remove("hidden");
    reviewCards.classList.add("flex-reverse");
  } else {
    reviewCards.children[reviewCardVisibleIndex + 1].classList.remove("hidden")
  };

}

function showPreviousCard() {
  reviewCards.classList.remove("flex-reverse");
  reviewCardVisibleIndex - 1 < 0 ?
    reviewCardVisibleIndex = reviewCards.children.length - 1 :
    reviewCardVisibleIndex -= 1;


  for (let i = 0; i < reviewCards.children.length; i++) {
    reviewCards.children[i].classList.add("hidden");
  }

  reviewCards.children[reviewCardVisibleIndex].classList.remove("hidden");

  if (reviewCardVisibleIndex == 0) {
    reviewCards.children[reviewCards.children.length - 1].classList.remove("hidden");
    reviewCards.classList.add("flex-reverse");
  } else {
    reviewCards.children[reviewCardVisibleIndex - 1].classList.remove("hidden")
  };

}
//staff info

let staffArr = [
  {
    name: "Jenny Wilson",
    job: "Chef",
    img: "./img/staff/1.jpg",
    social: {
      facebook: "https://www.facebook.com/",
      insta: "https://twitter.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    name: "Joe Black",
    job: "Senior Chef",
    img: "./img/staff/2.jpg",
    social: {
      facebook: "https://www.facebook.com/",
      insta: "https://www.instagram.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    name: "Emily House",
    job: "Senior Chef",
    img: "./img/staff/3.jpg",
    social: {
      facebook: "https://www.facebook.com/",
      insta: "https://www.instagram.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    name: "Wilson Frank",
    job: "Chef",
    img: "./img/staff/4.jpg",
    social: {
      facebook: "https://www.facebook.com/",
      insta: "https://www.instagram.com/",
      twitter: "https://twitter.com/"
    }
  }
]

for (let i = 0; i < staffArr.length; i++) {
  let div = document.createElement("div");
  div.innerHTML = `
    <div class="staff__cardContent" >
            <div class="staff__cardTitle">${staffArr[i].name}</div>
            <div class="staff__cardSubtitle">${staffArr[i].job}</div>
            <div class="staff__cardSocialMediaLinksContainer hidden">
              <div>
                <a class="staff__facebookLink" href="${staffArr[i].social.facebook}">
                   <img class="staff__socialIcon" src="./img/staff/facebook-svgrepo-com.svg" alt="">
                </a>
              </div>
              <div>
                <a class="staff__instaLink" href="${staffArr[i].social.insta}">
                   <img class="staff__socialIcon" src="./img/staff/instagram-logo-facebook-svgrepo-com.svg" alt="">
                </a>
              </div>
              <div>
                <a class="staff__twitLink" href="${staffArr[i].social.twitter}">
                   <img class="staff__socialIcon" src="./img/staff/twitter-round-svgrepo-com.svg" alt="">
                </a>
              </div>
            </div>
          </div> `;

  div.classList.add("staff__card");
  // div.style.backgroundImage.URL = staffArr[i].img;
  div.style.backgroundImage = `url(${staffArr[i].img})`
  staffCards.insertAdjacentElement("beforeend", div);
}
