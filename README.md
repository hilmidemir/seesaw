# ⚖️ Seesaw Physics Simulation

An **interactive seesaw physics playground** built with **HTML, CSS, and JavaScript** — no frameworks, no libraries.  
Click to drop weights, drag to move them, and watch the plank tilt in real time!


🌐 **Live Demo:** [https://hilmidemir.github.io/seesaw/](#)

## 🧠 Project Roadmap

### 1. HTML + CSS Skeleton
- Built the base layout containing the **plank**, **pivot**, and **HUD** elements.  
- Established clean structure and responsive positioning.

### 2. Initial Click Interaction
- Implemented click detection on the plank.  
- Displayed X-coordinate position for testing click placement.

### 3. Physics Calculation
- Added real-world balance logic:
  - **Torque = weight × distance from center**
  - Applied maximum tilt constraint of **±30°**.

### 4. Animation
- Introduced smooth, frame-based animation for realistic tilting.  
- The plank transitions gradually to its new equilibrium angle.

### 5. Object Creation
- Each click spawns a new weight object (random **1–10 kg**).  
- Weight appears visually on the plank at the clicked position.

### 6. HUD (Heads-Up Display)
- Displays **real-time information** including:
  - Left and right side total weights  
  - Next random weight  
  - Current plank angle  

### 7. Data Persistence
- Implemented **localStorage** to save and restore simulation state.  
- The setup remains intact even after refreshing the page.

### 8. Responsive Design
- Optimized layout for all devices — desktop, tablet, and mobile.  
- Maintains clarity and usability across screen sizes.

### 9. Modular Architecture
- Refactored project into multiple self-contained modules for clarity:
  - `physics.js` → physics & torque calculations  
  - `render.js` → DOM rendering logic  
  - `storage.js` → localStorage operations  
  - `utils.js` → helper functions  
  - `main.js` → main controller / event handling  

---

## 🚀 Features

✔️ Realistic torque-based balance physics  
✔️ Click to add random weights (1–10 kg)  
✔️ Drag & drop repositioning  
✔️ Smooth tilt animation  
✔️ LocalStorage state saving  
✔️ Sound effects for drop, drag, and reset  
✔️ Modular and maintainable file structure  

---

## 🧩 File Structure

📁 seesaw/
│
├── index.html
│
├── style/
│ └── styles.css
│
├── js/
│ ├── main.js
│ ├── physics.js
│ ├── render.js
│ ├── storage.js
│ ├── utils.js
│
└── assets/
├── drag.mp3
├── drop.mp3
└── reset.mp3

---

## 🕹️ How to Use

1. **Click** anywhere on the plank to drop a random-weight ball.  
2. **Drag** a ball to reposition it along the plank.  
3. **Watch** the seesaw tilt in real-time based on balance physics.  
4. **Reset** to clear all weights and restore the plank to level position.  
5. All data (positions, weights, and angle) are automatically **saved** in localStorage.

---

## 📐 Physics Explained

> **Torque = Weight × Distance from Center**

- The difference between left and right torques determines the **plank’s angle**.  
- The tilt is limited to **±30°** to maintain smooth and realistic motion.  

---

## 🧰 Technologies Used
- **HTML5** — structure & layout  
- **CSS3** — responsive design & animations  
- **Vanilla JavaScript (ES Modules)** — logic & interactivity  

---

## 🎧 Demo Sounds
- 🎵 *drag.mp3* — when dragging a weight  
- 💥 *drop.mp3* — when dropping a new weight  
- 🔄 *reset.mp3* — when resetting the scene  

---

## 🧑‍💻 Author
Developed by **Hilmi DEMİR**  
📬 Feel free to connect or provide feedback!

---
