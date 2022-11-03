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


## Usage
Example usage:
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

Available methods:
<table>
<tr><th>Method name</th><th>Arguments</th><th>Description</th></tr>
<tr><td>set()</td><td>Empty string</td><td>Modal title.</td></tr>
</table>

Available config parameters:
<table>
<tr><th>Name</th><th>Default value</th><th>Description</th></tr>
<tr><td>title</td><td>Empty string</td><td>Modal title.</td></tr>
<tr><td>content</td><td>Empty string</td><td>Modal content.</td></tr>
<tr><td>onOk</td><td>null</td><td>Submit action callback.</td></tr>
<tr><td>onCancel</td><td>null</td><td>Cancel action callback.</td></tr>
<tr><td>isClosable</td><td> true</td><td>Defines if modal is closable.</td></tr>
<tr><td>isDraggable</td><td> true</td><td>Defines if modal is draggable.</td></tr>
<tr><td>reverseButtons</td><td> false</td><td>If true buttons are reversed.</td></tr>
<tr>
<td>labels</td>
<td>ok: Okay<br>cancel: Cancel</td>
<td>Define button labels.</td>
</tr>
<tr><td>containerStyles</td><td>Empty object</td><td>Contains modal container styles. You can use any css styles here.</td></tr>
<tr><td>headerStyles</td><td> Empty object</td><td>Contains modal header styles. You can use any css styles here.</td></tr>
<tr><td>bodyStyles</td><td> Empty object</td><td>Contains modal body styles. You can use any css styles here.</td></tr>
<tr><td>footerStyles</td><td> Empty object</td><td>Contains modal footer styles. You can use any css styles here.</td></tr>
<tr><td>buttonsStyles</td><td> Empty object</td><td>Contains modal buttons styles. You can use any css styles here.</td></tr>
</table>

Example with all availables configuration parameters:

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
    },
    isClosable: true,
    isDraggable: true,
    reverseButtons: false,
    containerStyles: {
        radius: '25px',
    },
    headerStyles: {
        background: '#FFFFFF',
        color: '#000000',
        textAlign: 'left',
    }
}).show();
```
## Licensing
This project is licensed under [MIT license](https://opensource.org/licenses/MIT).



## Created and maintained by

Konrad Sroga – [@ksroga](https://github.com/ksroga) 🇵🇱
