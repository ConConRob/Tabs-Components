class Dropdown {
  constructor(element) {
    // Assign this.element to the dropdown element
    this.element = element;
    // Get the element with the ".dropdown-button" class found in the dropdown element (look at the HTML for context)
    this.button = this.element.querySelector('.dropdown-button');
    // assign the reference to the ".dropdown-content" class found in the dropdown element
    this.content = this.element.querySelector('.dropdown-content');
    // Add a click handler to the button reference and call the toggleContent method.
    this.button.addEventListener('click', () => this.toggleContent());
    TweenMax.to(this.content, 0, { x: -250 });
    this.hidden = true;
  }

  toggleContent() {
    if (this.hidden) {
      TweenMax.to(this.content, 1, { x: 0 });
      this.hidden = false;
    } else {
      TweenMax.to(this.content, 1, { x: -250 });
      this.hidden = true;
    }
  }
}


// Nothing to do here, just study what the code is doing and move on to the Dropdown class
const dropdowns = document.querySelectorAll('.dropdown').forEach(dropdown => new Dropdown(dropdown));
