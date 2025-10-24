Project Roadmap — Seesaw Physics Simulation
1. HTML + CSS Skeleton

Set up the basic structure and layout of the project — including the plank, pivot, and HUD (heads-up display) elements.

2. Initial Click Interaction

Implement the first interaction: when the user clicks on the plank, display the X-coordinate (position) where the click occurred.

3. Physics Calculation

Add the core physics logic:

Compute torque and target angle.

Apply physical constraints (maximum tilt: ±30°).

4. Animation

Introduce smooth animation:

When a new weight is added, the plank transitions smoothly to its new equilibrium angle.

5. Object Creation

Generate weight objects dynamically:

Each click spawns a new object with a random weight between 1–10 kg.

Display the object visually on the plank.

6. HUD (Heads-Up Display)

Show real-time information including:

Left and right side weights.

Next random weight.

Torque and balance information.

7. Data Persistence

Enable data storage so that:

The simulation state is saved and restored even after refreshing the page.

8. Responsive Design

Optimize for all devices:

Ensure the interface scales and adapts properly for mobile and tablet screens.

9. Modular Architecture

Refactor into a clean, modular structure:

Separate logic into independent JS modules (e.g., physics.js, render.js, storage.js, etc.).

Improve readability, maintainability, and scalability.

Seesaw Physics Simulation

An interactive seesaw physics playground built with pure HTML, CSS, and JavaScript.

Click to drop weights, drag to move them, and watch the plank tilt in real time.



Features

- Realistic torque-based balance physics

- Click to add random weights (1–10 kg)

- Drag & drop repositioning

- Smooth plank tilt animation

- LocalStorage state saving

- Sound effects for drop, drag, and reset

- Simple modular file structure (render, physics, storage, utils)

🧩 File Structure

📁 seesaw/
│
├── index.html

└── style/
    ├── styles.css

└── js/
    ├── main.js
    ├── physics.js
    ├── render.js
    ├── storage.js
    ├── utils.js
└── assets/
    ├── drag.mp3
    ├── drop.mp3
    └── reset.mp3

🕹️ Usage

Click on the plank to drop a random-weight ball.

Drag a ball to move it along the plank.

Reset clears all weights and resets the angle.

All data (positions & angle) are saved in localStorage so the state persists after refresh.

📐 Physics

Torque = weight × distance from center

The plank angle is mapped from torque difference, limited to ±30 ° for a smooth realistic effect.