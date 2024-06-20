// Wait until the HTML content is fully loaded 
document.addEventListener('DOMContentLoaded', function () {
    const textEditor = document.getElementById('text-editor'); // Get reference to the text editor
    
    // update text to the console
    textEditor.addEventListener('input', function () {
        console.log('Text changed:', textEditor.value);
    });

    // Open file dialog and load selected .txt file into the text editor
    document.querySelector('.menu-file-open').addEventListener('click', function () {
        const fileInput = document.createElement('input'); 
        fileInput.type = 'file'; // Set the input type to file
        fileInput.accept = '.txt'; // .txt files can be accepted
        fileInput.onchange = function (event) { // When a file is selected
            const file = event.target.files[0]; // Get the selected file
            const reader = new FileReader(); // Create a file reader
            reader.onload = function (e) {
                textEditor.value = e.target.result; // Load the file content
            };
            reader.readAsText(file); // Read the selected file
        };
        fileInput.click(); //click on the file input to open the file dialog
    });

    // Save the txt file 
    
    document.querySelector('.menu-file-save').addEventListener('click', function () {
        const blob = new Blob([textEditor.value], { type: 'text/plain' }); // Create a blob containing the text content
        const url = URL.createObjectURL(blob); // Create a URL for the blob
        const a = document.createElement('a'); // Create a new anchor element
        a.href = url; // Set the anchor's URL to the object URL
        a.download = 'document.txt'; // download document.txt
        a.click(); // Simulate a click on the anchor to trigger the download
        URL.revokeObjectURL(url); // Release the object URL
    });

    // Toggle the active state of menu dropdowns when clicked
    const menus = document.querySelectorAll('.menu');
    menus.forEach(menu => {
        menu.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the event from bubbling up
            menus.forEach(m => {
                if (m !== menu) {
                    m.classList.remove('active'); // Remove the active class from other menus
                }
            });
            menu.classList.toggle('active'); // Toggle the active class on the clicked menu
        });
    });

    // Close all menu dropdowns when clicking outside of menus
    document.addEventListener('click', function () {
        menus.forEach(menu => {
            menu.classList.remove('active'); // Remove the active class
        });
    });

    // Close a tab when close button is clicked
    const tabsContainer = document.querySelector('.editor-tabs');
    tabsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('close-tab')) {
            const tab = event.target.parentElement; // Get the parent element of the close button
            tab.remove(); // Remove the tab from the DOM
        }
    });

    // Add a new tab with when the add tab button is clicked
    const addTabButton = document.querySelector('.add-tab');
    addTabButton.addEventListener('click', function () {
        let newTabName = `NewFile${Object.keys(files).length + 1}.txt`; // Generate a tab name
        let count = 1;
        while (files[newTabName]) {
            newTabName = `NewFile${Object.keys(files).length + count}.txt`;
            count++;
        }
        addTab(newTabName); // Add the new tab
        setActiveTab(newTabName); // Set the new tab as active
    });

    let currentTab = null;
    const files = {}; // Object to store file content for each tab

    //update the text editor content
    tabsContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('close-tab')) {
            // Handling for closing tabs is already covered above
        } else if (target.classList.contains('tab') || target.parentElement.classList.contains('tab')) {
            const tab = target.classList.contains('tab') ? target : target.parentElement; // Get the clicked tab element
            setActiveTab(tab.dataset.name); // Set the clicked tab as active
        }
    });

    // Function to add a new tab with a given name
    function addTab(name) {
        const tab = document.createElement('div'); // Create a new <div> element for the tab
        tab.classList.add('tab'); // Add the 'tab' class to the tab element
        tab.dataset.name = name; // Set a custom data attribute for the tab name
        tab.innerHTML = `${name} <span class="close-tab">x</span>`; // Set the inner HTML of the tab
        tabsContainer.insertBefore(tab, addTabButton); // Insert the tab before the add tab button
        files[name] = ''; // Initialize empty content for the new file
    }

    //set a tab as active and update the text editor content
    function setActiveTab(name) {
        currentTab = name; 
        const tabs = tabsContainer.querySelectorAll('.tab'); // Get all tab elements
        tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.name === name)); // Toggle the active class based on the tab name
        textEditor.value = files[name] || ''; // Set the text editor content to the file content or empty if none
    }
});
