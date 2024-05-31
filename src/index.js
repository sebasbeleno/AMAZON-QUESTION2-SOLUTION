/**
 * File for setting up the environment. Please do not modify.
 */

import "./css/style.css"
import "./js/script"

if (module.hot) {
  module.hot.accept();
}

console.log('DOM Loaded');

const items = document.querySelectorAll(".accordion")
const multipleCheckbox = document.getElementById('multiselect');


items.forEach(item => {
  console.log(item)
  const title = item.querySelector(".title-section")

  const expandIcon = item.querySelector(".expand-icon")
  const collapseIcon = item.querySelector(".collapse-icon")
  const description = item.querySelector(".description")

  title.addEventListener("click", () => {
    const isExpanded = item.classList.contains('expanded')

    if (!multipleCheckbox.checked) {
      items.forEach(i => {
        i.classList.remove('expanded');
      });
    }

    if (!isExpanded) {
      item.classList.add('expanded');
      collapseIcon.classList.remove("disable")

    } else {
      item.classList.remove('expanded');
      collapseIcon.classList.add("disable")
    }

  })
})