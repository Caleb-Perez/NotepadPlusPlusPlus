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
