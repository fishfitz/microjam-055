export default (duration = 2000, intensity = 5) => {
  const style = document.createElement('style');

  style.innerHTML = `
    @keyframes screenShake {
      0% { transform: translate(0, 0); }
      5% { transform: translate(-${intensity}px, ${intensity}px); }
      10% { transform: translate(-${intensity}px, -${intensity}px); }
      15% { transform: translate(${intensity}px, ${intensity}px); }
      20% { transform: translate(${intensity}px, -${intensity}px); }
      25% { transform: translate(-${intensity}px, ${intensity}px); }
      30% { transform: translate(-${intensity}px, -${intensity}px); }
      35% { transform: translate(${intensity}px, ${intensity}px); }
      40% { transform: translate(${intensity}px, -${intensity}px); }
      45% { transform: translate(-${intensity}px, ${intensity}px); }
      50% { transform: translate(-${intensity}px, -${intensity}px); }
      55% { transform: translate(${intensity}px, ${intensity}px); }
      60% { transform: translate(${intensity}px, -${intensity}px); }
      65% { transform: translate(-${intensity}px, ${intensity}px); }
      70% { transform: translate(-${intensity}px, -${intensity}px); }
      75% { transform: translate(${intensity}px, ${intensity}px); }
      80% { transform: translate(${intensity}px, -${intensity}px); }
      85% { transform: translate(${intensity}px, ${intensity}px); }
      90% { transform: translate(${intensity}px, -${intensity}px); }
      95% { transform: translate(-${intensity}px, ${intensity}px); }
      100% { transform: translate(0, 0); }
    }
    .shake {
      animation: screenShake ${duration}ms;
    }
  `;

  document.head.appendChild(style);

  document.body.classList.add('shake');

  setTimeout(() => {
    document.body.classList.remove('shake');
    document.head.removeChild(style);
  }, duration)
}