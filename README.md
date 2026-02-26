# Robot Strategy & Management Hub

A comprehensive platform for FTC/FRC robotics teams to simulate, track hardware, analyze match data, and collaborate using AI.

## Key Features

- **3D Robot Simulator**: Built with Three.js. Test autonomous movement (WASD controls) and view live telemetry like proximity and grid position.
- **Part Inventory**: Real-time CRUD with Firebase. Search and filter parts like motors, sensors, and structural components. Includes stock level indicators.
- **FTC Scout Integration**: Logic to pull competitive data for strategic planning.
- **AI Performance Audit**: Connects to match scoring data to generate natural language insights on team performance (using OpenAI GPT-4o).
- **AI Collaborative Editor**: Collaborative writing space with built-in AI for match summaries and document generation. Support for exporting to PDF and DOCX.
- **Real-time Team Chat**: Private team chat rooms using Firestore for instant communication and strategy discussion.

## Prerequisites

- Node.js (v16.x or later)
- Firebase Project
- OpenAI API Key

## Installation

1. Clone this repository.
2. Install dependencies:
    