document.addEventListener('DOMContentLoaded', function () {
    const textEditor = document.getElementById('text-editor');

    textEditor.addEventListener('input', function () {
        console.log('Text changed:', textEditor.value);
        
    });

 
    document.querySelector('.menu-file-open').addEventListener('click', function () {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt';
        fileInput.onchange = function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                textEditor.value = e.target.result;
            };
            reader.readAsText(file);
        };
        fileInput.click();
    });

    document.querySelector('.menu-file-save').addEventListener('click', function () {
        const blob = new Blob([textEditor.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
});

const menus = document.querySelectorAll('.menu');

menus.forEach(menu => {
    menu.addEventListener('click', function (event) {
        event.stopPropagation();
        menus.forEach(m => {
            if (m !== menu) {
                m.classList.remove('active');
            }
        });
        menu.classList.toggle('active');
    });
});

document.addEventListener('click', function () {
    menus.forEach(menu => {
        menu.classList.remove('active');
    });
});


const tabsContainer = document.querySelector('.editor-tabs');
tabsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-tab')) {
        const tab = event.target.parentElement;
        tab.remove();
    }
});

const addTabButton = document.querySelector('.add-tab');
let currentTab = null;
const files = {};

tabsContainer.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('close-tab')) {
        const tab = target.parentElement;
        const tabName = tab.dataset.name;
        delete files[tabName];
        tab.remove();
        if (currentTab === tabName) {
            const remainingTabs = tabsContainer.querySelectorAll('.tab:not(.add-tab)');
            if (remainingTabs.length > 0) {
                const newTab = remainingTabs[0];
                setActiveTab(newTab.dataset.name);
            } else {
                currentTab = null;
                textEditor.value = '';
            }
        }
    } else if (target.classList.contains('tab') || target.parentElement.classList.contains('tab')) {
        const tab = target.classList.contains('tab') ? target : target.parentElement;
        setActiveTab(tab.dataset.name);
    }
});

addTabButton.addEventListener('click', function () {
    let newTabName = `NewFile${Object.keys(files).length + 1}.txt`;
    let count = 1;
    while (files[newTabName]) {
        newTabName = `NewFile${Object.keys(files).length + count}.txt`;
        count++;
    }
    addTab(newTabName);
    setActiveTab(newTabName);
});

function addTab(name) {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.dataset.name = name;
    tab.innerHTML = `${name} <span class="close-tab">x</span>`;
    tabsContainer.insertBefore(tab, addTabButton);
    files[name] = '';
}

function setActiveTab(name) {
    currentTab = name;
    const tabs = tabsContainer.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.name === name));
    textEditor.value = files[name] || '';
}

//open pop up
function createNewFile() {
    const popup = document.getElementById('pop-up');
    const container = document.getElementById('container');
    popup.classList.add('open-popup');
    container.classList.add('blur'); //come back to this 
}

//to close pop up
function closePopup(){
    const popup = document.getElementById('pop-up');
    const container = document.getElementById('container');
    popup.classList.remove('open-popup');
    container.classList.remove('blur');//come back to this 
    
}

function openFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt, .cpp, .py, .js' // add the file it can accept

    document.body.appendChild(fileInput);
    fileInput.click();
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileContent = e.target.result;
                console.log('File content:', fileContent);
                //have to add the connection to text editor
                window.location.href = "text.html"
            };
            reader.readAsText(file);
        }
        document.body.removeChild(fileInput);
    });
}