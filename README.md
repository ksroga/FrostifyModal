<p align="center"></p>
<h3 align="center">
  FrostifyModal.js
</h3>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
</p>

<p align="center">
Ultra lightweight, dependency-free javascript library for creating dynamic & full-customizable modal dialogs.
</p>


## Features
✔ Full-customizable styles

✔ Closes modal dialog on overlay click

✔ Closes modal dialog on pressing the ESC key

✔ Pressing TAB is working inside the modal.

✔ Ultra lightweight - it's only ~9kb!


## Installation

**via npm**
```shell
npm i frostify-modal
```

**via yarn**
```shell
yarn add 
```

**via CDN direct link**
```html

```


## Example usage
```javascript
FrostifyModal.set({
    title: 'Modal title',
    content: 'Text content',
    onok: () => {
        alert('Clicked ok button');
        return false; // do not close modal
    },
    oncancel: () => {
        alert('Clicked cancel button');
    },
    labels: {
        ok: 'Okay!',
        cancel: 'Cancel'
    }
}).show();
```

## Licensing
This project is licensed under [MIT license](https://opensource.org/licenses/MIT).



## Created and maintained by

Konrad Sroga – [@ksroga](https://github.com/ksroga) 🇵🇱
