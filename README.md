# Angular Quiz Domain-Driven Design

Angular Quiz DDD is a sample quiz application built with Angular that demonstrates the application of Domain-Driven Design (DDD) principles in a frontend project. The project is structured into clearly defined layers—Domain, Application, Infrastructure, and Presentation (UI) — to keep business logic completely isolated from framework-specific concerns.

Demo: [https://domain-driven-design.netlify.app/](https://domain-driven-design.netlify.app/)

## Overview

Angular Quiz DDD fetches trivia questions from the [Open Trivia Database](https://opentdb.com/) and allows users to take a timed quiz. The application supports session initialization, dynamic question loading, scoring, and a leaderboard.

Key features include:

- **DDD-Centric Design:** Emphasizes a clear separation of concerns by isolating Domain, Application, and Infrastructure layers from the Presentation layer.
- **Persistent Client-Side Storage:** Uses the [Dexie](https://dexie.org/) library to interact with IndexedDB for efficient local storage.
- **Dynamic Quiz Flow:** Loads new questions dynamically when users near the end of the current set.
- **Responsive UI:** Built with Angular standalone components for a modular, clean, and responsive design.

## Architecture

The application is organized into the following layers:

- **Domain Layer:**  
  Contains all business models, entities, value objects, and domain services. This layer implements the core business logic and remains framework-agnostic.

- **Application Layer:**  
  Houses use cases that orchestrate domain operations. This layer serves as a bridge between the domain and the rest of the application, ensuring that business logic is decoupled from presentation concerns.

- **Infrastructure Layer:**  
  Responsible for interacting with external services and technologies. For example:

    - **TriviaApi:** Handles API calls to the Open Trivia Database.
    - **CookieStorage:** Manages browser cookies.
    - **Dexie:** Used to interact with IndexedDB for persistent client-side storage.

    These services are abstracted from the Domain and Application layers to maintain isolation.

- **Presentation Layer:**  
  Contains Angular components and services. This layer depends on a facade or adapter service that in turn communicates with the Application layer. By doing so, it remains unaware of the underlying business and infrastructure logic.

# Folder Structure Overview

This document outlines the folder structure of the project and describes the responsibilities of each layer. The architecture follows Domain-Driven Design (DDD) principles, ensuring a clear separation between the Domain, Application, Infrastructure, and Presentation layers.

## Directory Structure

```
src/
 └── app/
       ├── domain/
       │    ├── models/
       │    ├── repositories/
       │    └── services/
       │           - quiz-domain.service.ts
       ├── application/
       │      ├── adapters/
       │      │      - quiz-facade.adapter.ts
       │      └── use-cases/
       ├── infrastructure/
       │      ├── api/
       │      │      - trivia-api.service.ts
       │      └── storage/
       │             - app.db.ts
       │             - cookie-storage.service.ts
       │             - settings-repository.service.ts
       │             - winners-repository.service.ts
       │
       ├── ui/ng/
       │      ├── components/
       │      └── services/
       └── app.component.ts
```
