const insert = content => {
   const elements = document.getElementsByClassName('ql-editor');

   if (elements.length === 0) {
      return;
   }

   const element = elements[0];

   // remove existing text
   const pToRemove = element.childNodes[0];
   pToRemove.remove();

   const splitContent = content.split('\n');

   // Wrap in p tags
   splitContent.forEach((content) => {
      const p = document.createElement('p');
 
      if (content === '') {
         const br = document.createElement('br');
         p.appendChild(br);
      } else {
         p.textContent = content;
      }
      
      // Insert into HTML one at a time
      element.appendChild(p);
   });
}

chrome.runtime.onMessage.addListener(
   (request, sender, sendResponse) => {
      if (request.message === 'inject') {
         const { content } = request;

         const result      = insert(content)
         if(!result){sendResponse({ status: 'failed' })}

         //console.log(content);
   
         sendResponse({ status: 'success' });
      }
   }
);