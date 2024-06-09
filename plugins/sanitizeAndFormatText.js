// plugins/sanitizeAndFormatText.js
export function textAreaFormatText(text) {
    // Escape HTML to prevent XSS
    const escapeHtml = (unsafe) => {
        if(unsafe){
            return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
        
    };
    if(text?.length >0){
        const safeText = escapeHtml(text);

        // Split the text by newline and wrap each line in <li> tags
        const listItems = safeText.split('\n').map(line => `<li>${line.trim()}</li>`).join('');
    
        // Wrap the list items in <ul> tags
        return `<ul class="list-disc list-inside mb-4 leading-6	">${listItems}</ul>`;
    }else{
        return ''
    }
    
}
export default defineNuxtPlugin(() => {
    return {
        provide: {
            textAreaFormatText: textAreaFormatText
        }
    };
});