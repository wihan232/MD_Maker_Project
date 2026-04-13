const copyBtn = document.getElementById('copyBtn');
const pasteBtn = document.getElementById('pasteBtn');
const cutBtn = document.getElementById('cutBtn');
const inputField = document.getElementById('myInput');
const delBtn = document.getElementById('delBtn');

const headOne = document.getElementById('headOne');
const headTwo = document.getElementById('headTwo');
const headThree = document.getElementById('headThree');
const headFour = document.getElementById('headFour');
const addChkBtn = document.getElementById('addChkBtn');
const strkThruBtn = document.getElementById('strkThruBtn');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const highlightBtn = document.getElementById('highlightBtn');
const characters = document.getElementById('characters');

const sampleBtn = document.getElementById('sampleBtn');
const wordCountBtn = document.getElementById('wordCountBtn');
const saveTxtBtn = document.getElementById('saveTxtBtn');

inputField.value =  
``

copyBtn.addEventListener('click', async () => {
  const textToCopy = inputField.value;

  const beginPos = inputField.selectionStart;
  const endPos = inputField.selectionEnd;

  try {
    // The modern way to copy text 
    await navigator.clipboard.writeText(textToCopy);
    
    // Optional: Provide visual feedback
    // copyBtn.innerText = '✅'; 
    // setTimeout(() => {
    //   copyBtn.innerHTML = '&#128203;'; // Reset to icon after 2 seconds
    // }, 2000);
    inputField.focus();
    inputField.setSelectionRange(beginPos, endPos);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
});

delBtn.addEventListener('click', async () => {
  inputField.value = '';
  inputField.focus();
  
});

headOne.addEventListener('click', async () => {
  selectionInsert('# ');
});

headTwo.addEventListener('click', async () => {
  selectionInsert('## ');
});

headThree.addEventListener('click', async () => {
  selectionInsert('### ');
});

headFour.addEventListener('click', async () => {
  selectionInsert('#### ');
});

addChkBtn.addEventListener('click', async () => {
  selectionInsert('- [ ] ');
});

function selectionInsert(textToInsert) {
  let beginPos = inputField.selectionStart;
  let endPos = inputField.selectionEnd;
  inputField.setSelectionRange(beginPos, endPos);

  let textLength = textToInsert.length;
  const currentValue = inputField.value;

  let leftChar = '';

  console.log(beginPos)
  if(!(beginPos === 0)){
    leftChar = currentValue.charAt(beginPos-1);
  } 

  if(leftChar === '' || leftChar === '\n'){
    inputField.value = currentValue.substring(0, beginPos) + textToInsert + currentValue.substring(endPos);
  } else {
    inputField.value = currentValue.substring(0, beginPos) + '\n' + textToInsert + currentValue.substring(endPos);
    textLength += 1;
  }

  endPos += textLength;
  inputField.setSelectionRange(endPos, endPos);
  inputField.focus();

}

strkThruBtn.addEventListener('click', async () => {
  inputField.value += '~~~~';
  inputField.focus();
  inputField.setSelectionRange(inputField.value.length - 2, inputField.value.length - 2);
});

boldBtn.addEventListener('click', async () => {
  inputField.value += '****';
  inputField.focus();
  inputField.setSelectionRange(inputField.value.length - 2, inputField.value.length - 2);
});

italicBtn.addEventListener('click', async () => {
  inputField.value += '**';
  inputField.focus();
  inputField.setSelectionRange(inputField.value.length - 1, inputField.value.length - 1);
});

highlightBtn.addEventListener('click', async () => {
  inputField.value += '====';
  inputField.focus();
  inputField.setSelectionRange(inputField.value.length - 2, inputField.value.length - 2);
});

cutBtn.addEventListener('click', async () => {
  const textToCopy = inputField.value;

  try {
    // The modern way to copy text 
    await navigator.clipboard.writeText(textToCopy);
    
    inputField.value = '';
    inputField.focus();
    
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
});

pasteBtn.addEventListener('click', async () => {
  try{
    const beginPos = inputField.selectionStart;
    const endPos = inputField.selectionEnd;

    inputField.value += await navigator.clipboard.readText();
    
    inputField.focus();
    inputField.setSelectionRange(beginPos, endPos);
  }
  catch(err) {
    console.error('Failed to paste: ', err);
  }
  
});

sampleBtn.addEventListener('click', async () => {
  let sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed\
  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\
  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,\
  sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  inputField.value += sampleText;
})

wordCountBtn.addEventListener('click', async () => {
  let wordCount = 0;
  let isBlank = true;
  for(let i = 0; i < inputField.value.length; i++){
    if(  inputField.value.charAt(i) === ' ' || inputField.value.charAt(i) === '\n'
      || inputField.value.charAt(i) === '=' || inputField.value.charAt(i) === '['
      || inputField.value.charAt(i) === ']' || inputField.value.charAt(i) === '*'
      || inputField.value.charAt(i) === '~' || inputField.value.charAt(i) === '#'
      || inputField.value.charAt(i) === '-'
    ){
      
      //don't set isBlank to true if char is '-'
      if(inputField.value.charAt(i) !== '-'){
        isBlank = true;
      } 
      
      //console.log('blank');
      //if(inputField.value.charAt(i) === '\n'){
        //console.log('linebreak')
      //}
    } else {
      if(isBlank === true && inputField.value.length !== 0){
        wordCount += 1;
        isBlank = false; 
        //console.log('not blank');
      }
    }
  }
  //console.log(inputField.value.length);
  characters.textContent = "wc: " + wordCount.toString();
});

saveTxtBtn.addEventListener('click', async () => {
  try{
    saveTxt();
  }
  catch(err) {
    console.error('Failed to save: ', err);
  }
  
});

async function saveTxt() {
  // 1. Open a save file picker
  const handle = await window.showSaveFilePicker({
    suggestedName: 'notes.txt',
    types: [{
      description: 'Text Documents',
      accept: { 'text/plain': ['.txt'] },
    }],
  });

  // 2. Create a writable stream
  const writable = await handle.createWritable();

  // 3. Write the content
  let save = inputField.value;
  await writable.write(save);

  // 4. Close the stream
  await writable.close();

}



// undo redo
// paste cache
// markdown features