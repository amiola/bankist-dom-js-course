'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});
/*
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
*/
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////

//  ---------------- SELECTING, CREATING AND DELETING ELEMENTS

//SELECTING ELEMENTS:
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
//For these special elements, we don't even need to write any selector.

//Otherwise, we can use querySelector:
const header = document.querySelector('header'); //returns the first element that matches the selector

//If we want to select multiple elements, then we should use:
const allSections = document.querySelectorAll('.section');
console.log(allSections); // it will return a nodeList that will contain all the elements that are a section, so that are selected by the selector.

//These selector are available not only on the document, but also on all the elements.

console.log(document.getElementById('section--1'));

const allButtons = document.getElementsByTagName('button'); //we get an HTMLCollection with all the elements with the name of button (<button></button>)
console.log(allButtons);
//An HTMLCollection is different from a node list because an HTML collection is actually a so-called life collection. Taht means that if the DOM changes then this collection is also immeadiately updated automatically. This doesn't happen with a node list.

console.log(document.getElementsByClassName('btn')); ////we get an HTMLCollection with all the elements with the class name of buttonbutton>)

//CREATING AND INSERTING ELEMENTS:
//We can create html elements using the insert adjacement html function.
//.insertAdjacementHTML()

//Creaing elements more programmatically:
const message = document.createElement('div'); //we pass the tag name as a string
//This will return a DOM element that we can the save somewhere. That element is not yet anywhere in our DOM. All this is, is a DOM object that we can use to do something on it but it is not yet in the DOM itself. So it's nowhere to be found on the webpage. If we wanted it on the page, then we have to manually insert it into the page.

//But first let's actually do something with it.

//For example, we can add classes:

//If we have an element in our DOM and select it, f.ex, using querySelector, then the result is also a DOM object that we can use in our code. This message is just the same. It's just an object that represents a dom element.
message.classList.add('cookie-message'); //we will now programmatically biuld an element which will display a small cookie message on the bottom of the screen.

//We can add text into the element:
message.textContent = 'We use cookies for improve functionality and analytics.';
//This inserts simply text.
//We can also insert a HTML:
message.innerHTML =
  'We use cookies for improve functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
//we can use both of these properties to read and to set content.

//We can now insert this element into our DOM. Let's do this in the header
header.prepend(message);
//prepend basically adds the element as the first child of this element.

//We can also add it as the last child:
header.append(message);

//What we see here is that the element was actually only inserted once (one time, not two) that's because message is now indeed a life element living in the dom. And so therefore it cannot be at multiple places at the same time.
//What the append method did was to move the element to the last place.

//So we can use the prepend and append methods not only to insert elements but also to move them. That's because a DOM element is unique, so it can only exist at one place at a time.

//What if we actually wanted to insert multiple copies of the same element?
//In that case we have actually to first copy the first element:
//header.prepend(message.cloneNode(true)); //instead of prepending the message directly, we first clone it. We have to pass true, which means that all the child elements will also be copied.

/*
header.before(message); //will insert message before the header element
header.after(message); //will insert message after the header element
*/

//DELETE ELEMENTS:
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    e.preventDefault();
    message.remove();
  });

//before the remove method, you could only remove a child element, and it would look like this: message.parentElement.removeChild(message)

//  ---------------- STYLES, ATTRIBUTES AND CLASSES

//STYLES:
//Set a style on an element:
message.style.backgroundColor = '#37383d'; //style then dot the property name
message.style.width = '120%'; //we have to write the CSS value exactly as we would do in CSS, so always have to include the unit

//These are called inline styles, an we can see them as an atribute of the element.

//We cannot read a style using this:
console.log(message.style.height); // we get an empty line. That's because using the style property like this only works for inline styles that we set ourselves also using the style property. So it's gonna work, for example, for the background color:
console.log(message.style.backgroundColor); //rgb(55, 56, 61)

//We cannot get a style that is hidden inside of a class or maybe that doesn't even exist.

//We can still get the styles if we really want to, all we need to do is to use the getComputedStyle function:
console.log(getComputedStyle(message)); //we need to pass in the element
//we get a huge object with all of the properties with all of the values

//We can simply take a certain property from there:
console.log(getComputedStyle(message).color); //rgb(187, 187, 187)

//Changing the height:
message.style.height =
  parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'; //the value of the height is a string, we have to get only the number. So we use parseFloat

//CSS varibles:
//The css variables work just as JS variables. They are declared in the root element (is like the document element)

//document.documentElement.style.setProperty('--color-primary', 'orangered'); //we pass the name of the property and then the value

//We can do the same for all properties, so we could also use setProperty to set the color, or the background color or the width, or really whatever we want.

//ATTRIBUTES:
//In html the attributes are src, alt, class, id. In Js we can access and change these differnte attributes
const logo = document.querySelector('.nav__logo');
//Now we can access to the attributes:
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:64065/img/logo.png
console.log(logo.className); //nav__logo

//so this works because on images they are supossed to have the alt and the src attributes on them and so if we specify them in html, the Js will automatically create these properties on the object. But if we add some other property that is not standard then JS will not automatically create a property on the object.
console.log(logo.designer); //undefined //that's because this is not a standard propertythat is expected to be in images.

//There is another way to read this value from the dom:
console.log(logo.getAttribute('designer')); //Jonas

//We can also set that values:
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt); //Beautiful minimalist logo

logo.setAttribute('company', 'Bankist'); //first the attribute, then the value

console.log(logo.src); //http://127.0.0.1:64065/img/logo.png (this is the absolute link)
//we get a different url that the one in the html file. To get this one, we us getAttribute
console.log(logo.getAttribute('src')); //img/logo.png (this is the relative link)

//Data attributes:
//They are a special type of attribute that start with the word data:
//we added this attribute to the logo: data-version-number="3.0"
console.log(logo.dataset.versionNumber); //3.0 we change the name of the attruibute to camelcase

//This special attributes re always stored in the dataset object

//CLASSES:
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); //similar to includes

//We can use the className to set a new class:
//logo.className = 'jonas';
//DON'T USE IT BECAUSE IT WILL OVEWRUTE ALL THE EXISTING CLASSES

// ------------------ IMPLEMENTING SMOOTH SCROLLING

//2 ways of doing this:

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

  //1) more old school:
  //we first have to get the coordinates of the element that we want to scroll to.
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  //we have x = distance to the left border
  //y = distance from the top (this is relaitive to the current viewport)

  //We can get the current scroll position:
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //We can also get the height and the width of the current viewport:
  console.log(
    'Current heigth/width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //We need the coordinates to scroll to that part
  //Scrolling:
  //window.scrollTo(s1coords.left, s1coords.top); //first argument: left position, second: top position

  //However, if we click again, it doesn't really work. That's because the top property that we specified is always relative to the view port, but not to the document (not to the top of the page).
  //The solution to this problem is to simply add the current scroll position to the top value. With this, we will then determine the position of the section not relative to the viewport, so to the top of the page.
  //So the position of the section is always the top position + the current scroll position.
  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );
  */

  //We can make this even better. There's a way to make this animation nice and smooth. This works by passing in an object instead of just one argument:
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  //2) Modern way:
  //we simply take the element that we want to scroll to:
  section1.scrollIntoView({
    behavior: 'smooth',
  }); //we pass in an object and specify the behavior
});

// ------------------ TYPES OF EVENTS AND EVENT HANDLERS

//An vent is basically a signal that is generated by a certain dumb node and a signal means that something has happened. For example, a click somewhere or the mouse moving, or the user triggering the full screen mode and really anything of importance that happens on our webpage, generates an event.

//We can then listen and fold these events in our code using event listeners.
//But no matter if we handle a certain event or not, f ex a click, that event will always happen when a user clicks. So it doesn't matter if we're actually listening for it or not.

//MOUSEENTER EVENT:
//It fires whenever a mouse enters a certain element.
const h1 = document.querySelector('h1');
/*
h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener: Great! You are reading the heading!');
});
*/

//For more events: look into the Event reference | MDN

//Another way of attaching an event listener to an element. That's by using the so-called on-event property directly on the element:
/*
h1.onmouseenter = function (e) {
  alert('addEventListener: Great! You are reading the heading!');
};
*/

//For each event there is one on-event property. However, this way of listen to events is a bit old school. Now we usually always use addEventListener.

//There are two ways why assEventListener is better. The first one is that it allows us to add multiple event listeners to the same event.

//The second one is that we can actually remove an event handler in case we don't need it anymore.
//To do that, first we need to export the function into a named function. Into this function, we remove the event listener.
/*
const alertH1 = function (e) {
  e.preventDefault();
  alert('addEventListener: Great! You are reading the heading!');

  //Removing the event listener:
  //h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

//We can remove it, for example, after a certain time has passed:
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 1 * 1000);
*/

//There is a third way of handling events, which is by using an html attribute. this one shoul actually not be used, but just for the sake of curiosity.

// ------------------ EVENT PROPAGATION: BUBBLING AND CAPTURING

//Js events have a very important property. they have a so-called capturing phase and a bubbling phase.

// ------------------ EVENT PROPAGATION IN PRACTICE
/*

//Let's see event propagation in practice, and mainly event bubbling. We're gonna do that by attaching event handlers to the navigation link, and also all of its parents elements. Then, as we click the link, we will give all these elements random background colors.

//Let's create a ramdm color. A color is made like this: rgb(3 numbers between 0 and 255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

//Now we want to attach an event listener to the link element and to the parents as well.
document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  //The this keyword points always to the element on which that event handler is attached. In this case, it's gonna be the nav link
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  //The target is essentially where the event originated, so where the event first happened. So this is not the element on which the handler is actually attached. it's where we clicked.

  //There is also the current target. It is indeed the element on which the event handler is attached.
  console.log(e.currentTarget === this); //true
  //The current target is exactly the same as the this keyword. The this keyword is also pointing to the element on which the event listener is attached to.

  //We can actually STOP the event propagation.
  //e.stopPropagation();

  //When we try to do the same, the parent elements did not change their background colors, which means that the event never arrived at those elements.
  //In practice, it's not a good idea to stop propagation.
});

//Parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
//If we do this, the container also got its own random background color.
//This happens because before the event actually happens at the document root and from there it then travels down to the target element. And then from there, it bubbles up. And that means that basically it's as if the event had also happened in all of the parent elements.

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
);

//These 3 event handlers receive events from the target elements and also from the bubbling phase. In other words, the event handler fucntions are listening for click events that happen on the element itself and also for events that keep bubbling up from their child elements. These are phase 2 ans phase 3.

//What about the capturing phase (phase 1)?
//Events are captured when they come down from the document route all the way to the target. But our event handlers are not picking up these events during the capture phase. That is the default behavior of the addEventListener method. The reason for that is that the capturing phase is usually irrelevant for us. It's just not that useful.
//On the other hand, the bubbling phase can be very useul for something called event delegation.

//However, if we do want to catch events during the capturing phase, we can define a third parameter in the addEventListener function. We can set that parameter to true or false. When it's true, the event handler will no longer listen to bubbling events, but instead to capturing events.

//In practice, it's gonna look the same. The differnece is that now the first element through which the event passes is the navigation. Ther eason for that is that this element is now actually listening for the event as it traveks down from the dom.
*/

// ------------------ EVENT DELEGATION: IMPLEMENTING PAGE NAVIGATION

//  Let's first implement this without event delgation.
/*
//Selecting all the buttons.
document.querySelectorAll('.nav__link');
//It will give a nodelist that we can use to attach an event handler to each of the elements.
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    //Implementing smooth scrolling
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
*/
//It will work for a few elements. But if we wanted to add this function to 10000 elements, then we would effectively be creating 10000 copies of this same function.

//A better solution is to use EVENT DELEGATION.
//In event delegation, we use the fact that events bubble up, and we do that by putting the event listener on a common parent of all the elements that we are interested in.

//In event delegation we basically need two steps:
//1) First, we add the event listener to a common parent element of all the elements that we are interested in.
//2) Then, in that event listener, determine what element originated the event, so we can then work with that element.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy: we need to check if the target has the nav__link class
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ------------------   DOM TRAVERSING

//Dom traversing is basically walking through the dom, which means that we can select an element based on another element. This is very important because sometimes, we need to select elements relative to a certain other element. F.ex, a direct child or a direct parent element. or sometimes we don't even know the structure of the dom at runtime.

//Let's start working with the h1 element and from there we're gonna go downwards, upwards and also sideways.

//(h1 variable is already created)

//GOING DOWNWARDS: selecting child elements

//Let's see what the element contains:
console.log(h1.querySelectorAll('.highlight'));
//This selects all the elements with the highlight class that are children of the h1 element and that would work no matter how deep these child elements would be inside of the h1 element.
//Also if there were other highlight elements on the page, so elements with these class, they would not get selected, because they would not be children of the h1 element.

//Sometimes, all we need are actually DIRECT CHILDREN. For that, we can use:
console.log(h1.childNodes); //node list with all kind of type elements
console.log(h1.children); //html collection (which remember is a live collection, so it's updated). In here we get only the elements that are actually inside of the h1. This only works for direct children

//FIRST AND LAST ELEMENT CHILD:
/*
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'blue';
*/

//GOING UPWWARDS: selecting parents

//Direct parents:
console.log(h1.parentNode);
console.log(h1.parentElement);

//Not direct parents:
//The closest method receives a query string just like querySelector and querySelectorAll, and returns the closest header that has the class.
/*
h1.closest('.header').style.background = 'var(--gradient-secondary)';
*/

//The closest method is basically the oposite of querySelector. Both receive a query string as an input, but querySelector finds children, no matter how deep in the dom tree, while the closest method finds parents, also no matter how far up in the dom tree.

//GOING SIDEWAYS: selecting siblings

//In JS we can only access direct siblings, so basically only the previous and the next one.
console.log(h1.previousElementSibling); //null (h1 is the first child element, so it doesn' have a previous sibling)
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//If we need all the siblings we can use the trick of moving up to the parent element and then read all the children from there.

console.log(h1.parentElement.children);

//We can create an array of the siblings and loop over it:
/*
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

// ------------------   BUILDING A TABBED COMPONENT

//A tabbed component can appear in many different ways, but what they all have in common is that they have some kind of tabs, and when you click the tab, then the content of the area below will change.

//In our html, the whole tab component is called operations. Then we have the tab container, then the contents.
//So as we click on one of the tabs, we will not create any new content. What we will do instead is to hide the other tabs basically. So the current content has the operations__content--active class.

//Selecting the elements:

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//Adding event handlers to the buttons:
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  //we want to get the button, no matter we click on the span (the number) or the button itself. So we need a way of selecting the parent element that is always a tab.
  const clicked = e.target.closest('.operations__tab');

  //Guard clause: an if statement which will return early if some condition is matched. In this case, when there's nothing clicked then we want to immediately finish this function.
  if (!clicked) return; //it's a more modern way to work, instead of putting all the code inside a block.

  //To put down the other buttons and put up the selected, we first have to remove the class that activates the behavior from all the tabs and then add the class to the selected:
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //It's basically clearing all the classes and the only add it afterwards on one of them.

  //Activate the content area:
  //const id = clicked.getAttribute('data-tab');
  const id = clicked.dataset.tab;
  const tabContent = document.querySelector(`.operations__content--${id}`);

  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  tabContent.classList.add('operations__content--active');
});

// ------------------  PASSING ARGUMENTS TO EVENT HANDLER

//Let's now create an effect on our page navigation, where all the links fade out when we hover over one of them, except for the link that we actually hovered over.

//mouseover is similar to mousenter, with the big difference that mouseneter does not bubble.
//the opposite of mouseenter is mouseleave, and the opposite of mouseover is mouseout.

const handleHover = function (e) {
  //We won't use the closest method because there are simply no child elements that we could accidentally click in the link.
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; //link hovered
    //All the links:
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};

//To Pass arguments to an event handler we will use the bind method. So, remember that the bind method creates a copy of the function that it's called on, and it will set the this keyword in this function call to whatever value that we pass into bind.
//This works becuase this is gonna be also a function, because bind returns a new function.

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//The event listener function can only have one parameter. If we want to pass additional values into the handler function, then we need to use the this keyword. And if we wanted multiple values, then we could of course, pass into the bind method an array or an object instead of just one value.

// ------------------  IMPLEMENTING A STICKY NAVIGATION: THE SCROLL EVENT

//The navigation bar will be attached to the top of the page after we scroll to a certain point.
//we make the navigation sticky when the top of the window reaches the first section.
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

//The scroll event: this event will be fired off each time that we scroll on our page.
/*
window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) {
    console.log('stick');
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
//Using the scroll event is really bad for performance

// ------------------  A BETTER WAY: THE INTERSECTION OBSERVER API

//This API allows our code to basically observe changes to the way that a certain target element intersects another element, or the way it intersects the viewport.

//To use the intersection observer API, we need to start by creating a new intersection observer. We need to pass in a callback function and an object of options.

//Callback function:
//This callback function will get called each time that the observed element, the target element, is intersecting the root element a the threshold that we defined, as we are ging up or down.
//The function will get called with 2 arguments: the entries and the observer (the same object created below). The entries are an array of the threshold entries.
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

//Options object:
const obsOptions = {
  root: null, //this root is the element that the target is intersecting. null is the entire viewport
  threshold: [0, 0.2], //this is basically the percentage of intersection at which the observer callback will be called. We can have multiple thresholds, so this could be an array. 0% means that basically our callback will trigger each time that the target element moves completely out of the view and also as it enters the view. On the other hand, if we specify 1 (100%), then that means that the callback will only be called when 100% of the target is actually visible in the viewport. In the case of the section1, that would be impossible because the section itself is already bigger than the viewport. In this case, we will have 4 entries if we scroll down: 1-when section 1 appears, 2-when 20% of section1 appears, 3-when 20% of section1 is left, 4-when section1 disappears.
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

//We have to use this observer to basically observe a certain target.
observer.observe(section1);
//We get an UntersectionObserverEntry. What is more important here is the intersectionRatio. At the top, it's 0, but when we start scrolling, the element h1 started to intersect the viewport. Now the intersection ratio changed.
//We also get the isIntersecting property.
*/

//STICKY NAVIGATION:
//When do we want that the navigation bar become sticky? We want that to happen when the header moves completely out of view. So, we are going to observe the header element.

console.log(header);

//Calculating the nav bar height:
const navHeigth = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries; //we use destructuring to get the first element (the same than entries[0])
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeigth}px`, //this is a box of 90 pixels that will be applied outside of our target element
});
headerObserver.observe(header);

// ------------------  REVEALING ELEMENTS ON SCROLL
/*

//Wec an observe all the sections with the same observer
console.log(allSections);

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target); //to stop the observer when the section appears
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //a little bit greater than 0
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

*/
// ------------------  LAZY LOADING IMAGES

//The lazy loading images is a estrategy that we implement in the html file. The main ingredient to this lazy loading strategy is that we have a very low resolution image, which is really small and which is loaded right in the beggining. The idea is, as we scroll to one of these low resolution images, we will then replace this low resolution image with the one hat is here specified in the data-src attribute. We will remove the class lazy-img which has kind of a filter, which makes this image blurred because without the filter, it would look really terrible (pixelated).

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace scr attribute with data-src
  entry.target.src = entry.target.dataset.src;

  //Removing filter

  //entry.target.classList.remove('lazy-img'); //If we remove the filter this way, the image may not have loaded and the user would see the low resolution img.

  //To do it when the img is loaded, we can use an event listener. When the image is loaded, an event occurs, so we can listen to that event and do something.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  //Stop observing the image
  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //for the user not to notice the lazy loading
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// ------------------ BUILDING A SLIDER COMPONENT

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length; //nodelists also have length

  const dotContainer = document.querySelector('.dots');
  const dots = document.querySelectorAll('.dots__dot');
  /*
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';
*/

  //FUNCTIONS:

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    //first slide at 0%, second at 100% and third at %200
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    actDot(curSlide);
  };

  //Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
    actDot(curSlide);
  };

  //Creating dots:
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //Activate dots
  const actDot = function (slide) {
    //Deactivating all the dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    //Activating the one we want
    //dots[slide].classList.add('dots__dot--active');
    //A better way:
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    //Default Slide
    goToSlide(0);

    createDots();

    //Default dot
    //dots[0].classList.add('dots__dot--active');
    actDot(0);
  };

  //EVENT LISTENERS:

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //Keyboard events:
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); //the same thing using shortcircuiting
  });

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;

    const slide = e.target.dataset.slide;
    goToSlide(slide);
    actDot(slide);
    curSlide = slide;
  });

  //INITIALIZATION
  init();
};
slider(); //we could give options as parameters, or an object with those options.

// ------------------ LIFECYCLE DOM EVENTS

//DOM CONTENT LOADED
//This event is fired by the document as soon as the html is completely parsed, which means that the html has been downloaded and been converted to the dom tree. Also, all scripts must be downloaded and executed before the dom content loaded even can happen.
//This event does not wait for images and other external resources to load. So just html and JS need to be loaded.

//With this here we can now execute code that should only be executed after the dom is available. In fact, we want all our code only to be executed after the dom is ready. So that means that we should wrap our entire code into an event listener like this? No, we don't need to do that. That's because we have to script tag, which is the one that imports a JS into the html, right at the end of the body, so basically it's the last thing that is going to be read in the html.

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

//LOAD EVENT:
//The load event is fired by the window as soon as not only the html is parsed, but also all the images and external resources like CSS files are also loaded. Basically when the complete page has finished loaded.

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//BEFORE UNLOAD EVENT:
//This event is created immediately before a user is about to leave the page. For example, after clicking the close button in the browser tab. You can use these events to ask users if they are 100% sure that they want to leave the page.

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
