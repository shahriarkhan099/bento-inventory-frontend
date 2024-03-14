# Bento Inventory Client

Welcome to Bento Inventory Client! This README.md file serves as a guide to understanding the main features of the app, its folder structure, and how to run it on your local machine.

## Main Features

The Bento inventory system, is designed to solve critical issues faced by inventory businesses. Here are the main features:

1. **Inventory Ingredients:** View current quantities of ingredients and other relevant details.
2. **Delivery Boxes:** Monitor the quantities of delivery boxes and related features.
3. **Track Wastage:** Record and track wasted ingredients to minimize losses.
4. **Order History:** Access a comprehensive record of past orders made from on-platform suppliers.
5. **Order Status:** Stay updated on the status of pending orders with real-time updates.
6. **My Supplier List:** Manage a list of preferred suppliers, including experience ratings and other pertinent information.
7. **Place Order:** Conveniently order from a list of vendors available on the platform, with search functionality.
8. **Automation of the Order System:** Automatically place orders when ingredient quantities fall below a certain threshold to prevent business disruptions and wastage. Our system employs sophisticated algorithms based on order history to calculate optimal order quantities.

## Folder Structure

```plaintext
.
└── src
    └── app
        └── auth-redirect
        └── component
            └── footer
            └── header
            └── spash-logo
        └── models
        └── pages
            └── delivery-boxes
            └── inventory-ingredients
            └── order-autopilot
            └── order-history
            └── order-status
            └── place-orders
            └── supplier-list
            └── track-wastage
        └── pipe
        └── services
            └── auth
            └── autopilot
            └── category
            └── config
            └── consumption-log
            └── delivery-box
            └── ingredient
            └── interceptors
                └── auth
                └── token
            └── localStorage
            └── on-platform-supplier
            └── order
            └── supplier-list
            └── vendor
            └── Vendor-data
            └── wastage-log
        └── utils
    └── assets
    └── environments
```


## Getting Started

### How to Run the App Locally

To run the app on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/shahriarkhan099/bento-inventory-frontend.git`
2. Navigate to the project directory: `cd bento-inventory-frontend`
3. Install dependencies: `npm install`
4. Start the development server: `ng serve --configuration=production -o`

### Live Link

You can access the live version of the app at [Bento Inventory](https://bento-inventory.vercel.app/). 

### Bento App Info

Our Bento inventory system solves three main issues to avoid business loss. Firstly, it ensures enough ingredients to run restaurants without disabling menus of the restaurant due to insufficient ingredients. Secondly, it helps users to avoid overstocking ingredients which can lead to ingredients wastage. Finally, our inventory system provides on-platform suppliers which will help users to order high-quality ingredients with the lowest price. It prevents users stocking low-quality ingredients which can cause business loss.


# Bento Inventory Client's Default Angular Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
