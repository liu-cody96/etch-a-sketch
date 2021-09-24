// TODO: Add functionality to change font size.
// TODO: Add fill functionality.
// TODO: Add save functionality.
// TODO: Add loading functionality.

const defaultValue = 16;
const defaultColor = 'black';
let currentColor = defaultColor;
const gridContainerNode = document.querySelector('div.grid-container');
const inputLengthNode = document.querySelector('input#size-slider');
const gridSizeNode = document.querySelector('div#size-of-grid');
const colorChooseNode = document.querySelector('input#color-chooser');
inputLengthNode.onchange = (e) => createGrid(e.target.value);
inputLengthNode.onmousemove = (e) => gridSizeNode.innerText = `${e.target.value} x ${e.target.value}`
colorChooseNode.onchange = (e) => currentColor = e.target.value;

function createGrid(size) {

    // reset HTML and default color
    gridContainerNode.innerHTML = '';
    colorChooseNode.value = defaultColor;
    currentColor = defaultColor;

    /*https://stackoverflow.com/questions/14910196/how-to-add-multiple-divs-with-appendchild
        use document frag here to add to DOM only once.
    */
    gridContainerNode.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainerNode.style.gridTemplateRows = `repeat(${size}, 1fr)`

    var docFrag = document.createDocumentFragment();
    for(var i = 0; i < size*size; i++) {
        newDiv = document.createElement('div');
        newDiv.classList.add('grid-element');
        docFrag.appendChild(newDiv); // Note that this does NOT go to the DOM
    }

    gridContainerNode.appendChild(docFrag); // Appends all divs at once

    /****************************************/
    /* CODE THAT ENABLES DRAWING ON CANVAS  */
    let colorPixel = function(event) {
        event.target.style.background = currentColor;
    }

    const gridElements = document.querySelectorAll('div.grid-element');

    // if mousedown on current pixel, change background color
    gridElements.forEach((element) => {
        element.addEventListener('mousedown', () => {
            element.style.background = currentColor;

            // if mouse moving over other pixels, change background color
            gridElements.forEach((pixel) => {
                pixel.addEventListener('mouseover', colorPixel);
            });

        });

    });

    // if mouseup, stop coloring
    gridElements.forEach((element) => {
        element.addEventListener('mouseup', () => {
            gridElements.forEach((pixel) => {
                pixel.removeEventListener('mouseover', colorPixel);
            });


        });
    })
    /****************************************/

    /****************************************/
    /* use event handler to do the erasing */
    const eraseButton = document.querySelector('button.clear-button');
    eraseButton.addEventListener('click', () => {
        gridElements.forEach((element) => {
            element.style.background = 'white';
        });
    })
}

window.onload = () => {
    createGrid(defaultValue);
}
