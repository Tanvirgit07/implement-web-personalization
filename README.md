# 🌟 Web Personalization Implementation Dashboard

A Next.js & TypeScript dashboard demonstrating live integration with the `web-personalization` SDK. It features dynamic weather theme switching, glassmorphic recommendation modals, auto-dismiss timers, and environmental context adaptation.

---

## 🚀 Features Implemented

- 🌤️ **Dynamic Weather & Climate Themes**: Real-time theme styling (`sunny`, `rainy`, `cloudy`, `stormy`, `night`) adapted from SDK context.
- 💬 **Glassmorphic Personalized Recommendation Modal**:
  - Floating trigger button with custom dismissal (`X`).
  - Auto-rotating insight carousel with progress indicators.
  - Position settings (`bottom-right`, `bottom-left`, `top-right`, `center`).
  - Auto-dismiss countdown timer and periodic reappear cooldown interval (45s).
- 📍 **Location & Time Greeting Banners**: Live location (`Dhaka, Bangladesh`) and time-based personalized greetings.

---

## ⚡ SDK Integration & JSON Response Example

This project consumes data from the `web-personalization` SDK via `useWeather()` context provider. Below is the standard SDK response format used by this application:

```json
{
  "context": {
    "time": "evening",
    "location": {
      "city": "Dhaka",
      "country": "Bangladesh",
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "weather": {
      "category": "rainy",
      "description": "Light Rain",
      "humidity": 82
    },
    "temperature": {
      "value": 28.5,
      "unit": "celsius",
      "category": "warm"
    }
  },
  "experience": {
    "content": {
      "title": "Good evening from Dhaka!",
      "message": "It's rainy and warm outside. Ideal time for indoor productivity or online learning."
    },
    "recommendations": [
      {
        "id": "rec-1",
        "title": "Rainy Day Indoor Workstation Setup",
        "message": "Stay dry and focus on indoor deep work or virtual team meetings."
      },
      {
        "id": "rec-2",
        "title": "Evening Warm Beverage Break",
        "message": "Enjoy a hot cup of tea or coffee while working on your dashboard."
      }
    ]
  }
}
```

---

## 🎨 Design & Customization Flexibility

Developers can use the structured response from `web-personalization` to craft custom UI components:
- Customize gradients, dark/light glassmorphic cards, notification toasts, floating widgets, and sidebars.
- Build tailored recommendation engines for e-commerce, dashboard insights, weather updates, or productivity trackers.

---

## 🖼️ Implementation Screenshots & Proof

Showcasing live implementation designs across all 5 weather theme categories:

### 🌤️ Weather Category Themes & Personalization UI

| 1. Sunny Theme | 2. Rainy Theme |
| :---: | :---: |
| ![Sunny Theme](./public/screenshots/sunny-theme.png) | ![Rainy Theme](./public/screenshots/rainy-theme.png) |

| 3. Cloudy Theme | 4. Stormy Theme |
| :---: | :---: |
| ![Cloudy Theme](./public/screenshots/cloudy-theme.png) | ![Stormy Theme](./public/screenshots/stormy-theme.png) |

| 5. Night Theme |
| :---: |
| ![Night Theme](./public/screenshots/night-theme.png) |

> 📌 **How to add screenshots:**
> 1. Save your 5 screenshot images inside `public/screenshots/`.
> 2. Name them `sunny-theme.png`, `rainy-theme.png`, `cloudy-theme.png`, `stormy-theme.png`, and `night-theme.png`.

---

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live application.
