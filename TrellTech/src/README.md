# `src` Folder Structure

```
- src
  - entities
  - use-cases
  - interfaces
  - presenters
  - components
```

## 1. Entities:

Define the core business objects or models of your application in the entities folder. These objects should be framework-independent and contain only the core data.

## 2. Use Cases:

Implement application-specific business rules in the use-cases folder. Use cases interact with entities and implement the core logic of your app.

## 3. Interfaces:

Define interfaces that provide contracts for communication between different layers. For example, create a data-source interface that defines methods for data retrieval and storage. These can be implemented with actual data sources, such as APIs or databases.

## 4. Presenters/ViewModels:

In the presenters folder, create components or classes that serve as ViewModels. These components handle the presentation logic and interact with the use cases and data sources. They update the React Native components in the components folder.

## 5. Components:

Create React Native components in the components folder, representing the Views of your application. These components should be as dumb and stateless as possible. They receive data and actions from the ViewModels and display the UI accordingly.
