export default function showMessage(canvasContainer, message) {
  const helpParagraf = document.createElement('p');
  helpParagraf.className = 'helpMessage';
  helpParagraf.innerText = message;
  canvasContainer.appendChild(helpParagraf);
  setTimeout(() => canvasContainer.removeChild(helpParagraf), 3000);
}
