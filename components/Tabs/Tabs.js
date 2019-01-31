class Tabs {
  constructor(element) {
    this.element = element;
    this.links = this.element.querySelectorAll('.tabs-link');
    this.objLinks = {};
    this.links.forEach((link) => {
      // pass a reference to this object
      const obj = new TabLink({ "element": link, "tabs": this });
      // set the init selected tab
      if (obj.element.classList.contains('tabs-link-selected')) {
        this.currentTab = obj.data;
      }
      this.objLinks[obj.data] = obj;
      return obj;
    });
  }
}

class TabLink {
  constructor({ element, tabs }) {
    // Assign this.element to the passed in DOM element
    this.element = element;
    this.parentTabs = tabs;
    // Get the custom data attribute on the Link
    this.data = this.element.dataset.tab;
    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(`.tabs-item[data-tab="${this.data}"]`);
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem({ element: this.itemElement, tabs: this.parentTabs });
    // Add a click event listener on this instance, calling the select method on click
    this.element.addEventListener("click", () => this.select());
  }

  select() {
    // select last selected tab
    const lastTab = this.parentTabs.objLinks[this.parentTabs.currentTab];
    // Deselect last selected tab
    lastTab.deselect();
    // Add a class named "tabs-link-selected" to this link
    this.element.classList.add('tabs-link-selected');
    // Call the select method on the item associated with this link
    this.tabItem.select(lastTab);
    // set the new last tab in the Tabs object AFTER ALL SELECTING IS DONE
    this.parentTabs.currentTab = this.data;
  }

  deselect() {
    this.element.classList.remove('tabs-link-selected');
  }
}

class TabItem {
  constructor({ element, tabs }) {
    // Assign this.element to the passed in element
    this.element = element;
    this.parentTabs = tabs;
  }

  select(lastTab) {
    lastTab.tabItem.deselect();
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.add('tabs-item-selected');
  }

  deselect() {
    this.element.classList.remove('tabs-item-selected');
  }
}

// get all the table of tabs and set them up
const allTabTables = document.querySelectorAll('.tabs');
allTabTables.forEach(tabs => new Tabs(tabs));
