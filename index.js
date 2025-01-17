const checkForKey = () => {
   return new Promise((res, rej) => {
      chrome.storage.local.get(['openai-key'], (result) => {
         res(result['openai-key'])
      })
   });
}; 

const encode = input => btoa(input)

const saveKey = ()=> {
   const input = document.getElementById('key_input');
   if(input) {
      const { value } = input
      const encodedValue = encode(value);
      chrome.storage.local.set({'openai-key': encodedValue}, ()=> {
         document.getElementById('key_needed').style.display = 'none';
         document.getElementById('key_entered').style.display = 'block';
      })
   }
}

const changeKey = ()=> {
   document.getElementById('key_needed').style.display = 'block';
   document.getElementById('key_entered').style.display = 'none';
};

document
   .getElementById('save_key_button')
   .addEventListener('click', saveKey);
document
   .getElementById('change_key_button')
   .addEventListener('click', changeKey);

checkForKey().then((response) => {
   if (response) {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
   }
});