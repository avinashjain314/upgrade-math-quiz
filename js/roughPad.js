/**
 * Interactive Rough Pad / Digital Scratchpad
 * Allows students to solve rough calculations directly on screen!
 * Upgrade Math Quiz by Avinash Sir
 */

const RoughPad = {
  canvas: null,
  ctx: null,
  isDrawing: false,
  color: '#38bdf8', // Default cyan
  lineWidth: 3,
  isEraser: false,

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.attachEvents();
    window.addEventListener('resize', () => this.resizeCanvas());
  },

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (!parent) return;
    
    // Save existing drawing data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(this.canvas, 0, 0);

    this.canvas.width = parent.clientWidth || 350;
    this.canvas.height = parent.clientHeight || 450;

    // Restore drawing
    this.ctx.drawImage(tempCanvas, 0, 0);
  },

  attachEvents() {
    if (!this.canvas) return;

    const startDraw = (e) => {
      this.isDrawing = true;
      const pos = this.getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      e.preventDefault();
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const pos = this.getPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.strokeStyle = this.isEraser ? '#0f172a' : this.color;
      this.ctx.lineWidth = this.isEraser ? 20 : this.lineWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
      e.preventDefault();
    };

    const stopDraw = () => {
      this.isDrawing = false;
    };

    // Mouse events
    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseup', stopDraw);
    this.canvas.addEventListener('mouseleave', stopDraw);

    // Touch events for mobile phones / tablets
    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', draw, { passive: false });
    this.canvas.addEventListener('touchend', stopDraw);
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  },

  setColor(hex) {
    this.isEraser = false;
    this.color = hex;
  },

  setEraser() {
    this.isEraser = true;
  },

  clear() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RoughPad;
}
