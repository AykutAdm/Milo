<div align="center">

**English** · [Turkish](./README.tr.md)

<img src="/docs/milo-logo.jpg" alt="Milo" width="120" />

# Milo

**A microservice-based subscription tracker that shows where your money goes and warns you before you pay.**

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Event--Driven-FF6600?logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## Overview

**Milo** solves a problem everyone has: dozens of subscriptions — Netflix, Spotify, GitHub, AWS, ChatGPT — and no clear answer to *"how much am I actually paying each month?"*

Milo brings all your subscriptions into one place, visualizes your spending with charts, stores account credentials securely, sends renewal reminders (both in-app **and by email**), and even provides **AI-powered savings suggestions** using the **Claude API**.

It is built as a **distributed, event-driven microservice system** with an **API Gateway**, three different databases, centralized logging, background jobs, and a modern React frontend.

> *The personal motto behind this project: **"Be better than yesterday."***

---

## Key Features

- 🔐 **Authentication & 2FA** — JWT-based authentication with **two-factor authentication** via Google Authenticator (TOTP), including QR code setup.
- 💳 **Subscription Tracking** — Full CRUD with platform, category, price, billing period, and renewal dates.
- 🗝️ **Encrypted Account Vault** — Optional credential storage; passwords are encrypted with **AES** and decrypted only on demand, with ownership checks.
- 📊 **Spending Reports** — Monthly totals and category breakdowns, visualized with interactive **pie charts**.
- ✨ **AI Savings Suggestions** — Sends subscription data to the **Claude API** and returns personalized savings suggestions (in Turkish).
- 📨 **Asynchronous Messaging** — Services never call each other directly; they publish and consume events over **RabbitMQ + MassTransit** (`UserRegistered`, `SubscriptionCreated`, `SubscriptionDeleted`, `RenewalReminder`). This keeps services loosely coupled, so the others keep working even if one goes down.
- 🔔 **Renewal Reminders** — A daily **Hangfire** background job finds upcoming renewals, publishes events, and produces both an in-app notification and a **real email** (MailKit/SMTP).
- ⏱️ **Automatic Date Rollover** — Past renewal dates automatically move to the next period based on the billing cycle (monthly/yearly), so data never goes stale.
- 📈 **Dashboard** — A summary screen with the monthly total, upcoming payments (with "3 days" / "Today" labels), a category chart, and recent notifications.
- 🔎 **Centralized Logging** — All services ship their logs to **Elasticsearch**, monitored through **Kibana**.
- 🌐 **Polyglot Persistence** — Each service owns its own database: **SQL Server**, **PostgreSQL**, and **MySQL**.

---

## Architecture

Milo runs four independent microservices behind an **API Gateway**. Services communicate **asynchronously over RabbitMQ** (event-driven) and never touch each other's databases — each service keeps its own copy of the data it needs.

```mermaid
flowchart TB
    Client["React Client<br/>(Vite + TypeScript)"]
    Gateway["API Gateway<br/>(Ocelot)"]

    Identity["Identity Service<br/>Auth · JWT · 2FA<br/>SQL Server"]
    Subscription["Subscription Service<br/>Subscriptions · AES Vault · Hangfire<br/>SQL Server"]
    Notification["Notification Service<br/>Notifications · Email<br/>PostgreSQL"]
    Reporting["Reporting Service<br/>Spending Reports · Claude AI<br/>MySQL"]

    RabbitMQ{{"RabbitMQ<br/>Event Bus"}}
    Claude["Claude API"]
    SMTP["SMTP / Email"]
    Elastic["Elasticsearch + Kibana"]

    Client --> Gateway
    Gateway --> Identity
    Gateway --> Subscription
    Gateway --> Notification
    Gateway --> Reporting

    Identity -- UserRegisteredEvent --> RabbitMQ
    Subscription -- SubscriptionCreated / Deleted / RenewalReminder --> RabbitMQ
    RabbitMQ --> Notification
    RabbitMQ --> Reporting

    Reporting --> Claude
    Notification --> SMTP

    Identity --> Elastic
    Subscription --> Elastic
    Notification --> Elastic
    Reporting --> Elastic
```

### Example Event Flows

- **New subscription:** `Subscription` publishes `SubscriptionCreatedEvent` → `Reporting` stores a copy for reports, and `Notification` creates a welcome notification.
- **Delete consistency:** `Subscription` publishes `SubscriptionDeletedEvent` → `Reporting` deletes its own copy.
- **Renewal reminder:** Hangfire job → `RenewalReminderEvent` → `Notification` writes an in-app notification **and** sends an email.
- **Email delivery:** On registration, `Identity` publishes `UserRegisteredEvent`; `Notification` stores the email on its own side, so it can send mail without ever calling the Identity database.

---

## Tech Stack

**Backend**
- ASP.NET Core 8 (Web API)
- Clean Architecture + CQRS/MediatR (Subscription service)
- Entity Framework Core
- MassTransit + RabbitMQ (event-driven messaging)
- Ocelot (API Gateway)
- ASP.NET Core Identity + JWT + TOTP 2FA
- Hangfire (scheduled background jobs)
- MailKit (SMTP email)
- Serilog + Elasticsearch + Kibana (centralized logging)
- Claude API (AI suggestions)

**Databases**
- SQL Server — Identity & Subscription
- PostgreSQL — Notification
- MySQL — Reporting

**Frontend**
- React 19 + Vite + TypeScript
- React Router
- Axios (with JWT interceptor)
- Tailwind CSS
- Recharts (charts)
- lucide-react (icons)

**Infrastructure**
- Docker (SQL Server, PostgreSQL, MySQL, RabbitMQ, Elasticsearch, Kibana)
- Portainer (container management)

---

## Services

| Service | Responsibility | Database | Highlights |
|---|---|---|---|
| **Identity** | Registration, login, JWT, 2FA | SQL Server | TOTP 2FA, publishes `UserRegisteredEvent` |
| **Subscription** | Subscriptions & encrypted vault | SQL Server | Clean Architecture, CQRS, AES vault, Hangfire job |
| **Notification** | In-app notifications & email | PostgreSQL | Consumes events, sends SMTP email |
| **Reporting** | Spending reports & AI suggestions | MySQL | Chart data, Claude API integration |
| **API Gateway** | Single entry point / routing | – | Ocelot |

---

## Screenshots

### Landing Page
![Landing](./docs/Home-1.png)

<details>
<summary>More landing page sections</summary>

| | |
|---|---|
| ![Landing](./docs/Home-2.png) | ![Landing](./docs/Home-3.png) |
| ![Landing](./docs/Home-4.png) | ![Landing](./docs/Home-6.png) |

![Landing](./docs/Home-7.png)

</details>

### Application

| Dashboard | Subscriptions |
|---|---|
| ![Dashboard](./docs/Dashboard-1.png) | ![Subscriptions](./docs/Dashboard-2.png) |
| **Encrypted Account Vault** | **Reports & AI Suggestions** |
| ![Accounts](./docs/Dashboard-3.png) | ![Reports](./docs/Dashboard-4.png) |
| **Notifications** | **Settings** |
| ![Notifications](./docs/Dashboard-5.png) | ![Settings](./docs/Dashboard-6.png) |
| **2FA Setup (QR)** | **2FA Login** |
| ![2FA Setup](./docs/Dashboard-7.png) | ![2FA Login](./docs/Login-2.png) |

### Authentication

| Register | Login |
|---|---|
| ![Register](./docs/Register.png) | ![Login](./docs/Login.png) |

### Renewal Reminder Email
![Email](./docs/email.png)

### Infrastructure

| Hangfire | Hangfire |
|---|---|
| ![Hangfire](./docs/hangfire-1.png) | ![Hangfire](./docs/hangfire-2.png) |
| **RabbitMQ** | **RabbitMQ** |
| ![RabbitMQ](./docs/rabbitMQ-1.png) | ![RabbitMQ](./docs/rabbitMQ-2.png) |
| **Kibana** | **Docker** |
| ![Kibana](./docs/kibana-1.png) | ![Docker](./docs/docker.png) |




---

## License

This project was developed for portfolio and learning purposes.

---

<div align="center">

🐧 Built by [**Aykut Adem**](https://github.com/AykutAdm)

</div>
