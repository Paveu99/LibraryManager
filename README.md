# Library Manager 📚🔖

**Library Manager** is a powerful and user-friendly web application designed to manage library books, users, and borrowing history. Whether you're a library administrator, a book enthusiast, or someone who wants to track book rentals, this app provides essential features to streamline the process!

## Key Features ✨

1. **User Management**
   - Users can register and log in using their library card ID.
   - Two user roles: **Client** (library user) and **Administrator**.
   - Clients can borrow and return books, while Administrators manage books and rentals.

2. **Book Management**
   - View, add, edit, and delete books in the library collection.
   - Prevent deletion of books currently borrowed by users.
   - Books have details such as title, author, description, year of publication, and available copies.

3. **Borrowing System**
   - Clients can borrow books for 14 days.
   - The number of available copies decreases when a book is borrowed.
   - Overdue books are highlighted with a different status.
   - Users can return books, updating the book's status accordingly.
   - Administrators can enforce book returns when necessary.

4. **Admin Dashboard**
   - Manage all books: add, update, or remove entries.
   - View all book rentals, including borrower details and due dates.
   - Force return of overdue books if necessary.
   - Monitor rental trends and overdue statistics.

5. **System Logs**
   - Every action is logged, including:
     - **Timestamp**: Date and time of the action.
     - **User**: Email or ID of the user performing the action.
     - **Action**: Examples include "User Registered", "Book Borrowed", "Book Returned".
   - Logs are accessible to administrators for monitoring.

6. **User Dashboard**
   - Clients can view their library card information and borrowing history.
   - Rental statistics, such as books borrowed per month, returned on time, and overdue books.
   - Users can return borrowed books directly from their dashboard.
   - Option to cancel library membership (all borrowed books must be returned first).

7. **Authentication & Authorization**
   - Secure authentication with role-based access control.
   - Clients and administrators have different privileges.
   - Only administrators can manage books and view system logs.

8. **Responsive Design**
   - Built with **Material UI** for a modern and intuitive interface.
   - Fully responsive layout, optimized for all screen sizes.

9. **Performance & Code Quality**
   - **Express.js** backend for API management.
   - **Linter & Husky** configured for code consistency.
   - **Pagination** implemented for book listings.
   - Unit and E2E tests for core functionalities (e.g., registration, login, book borrowing, returns).

## Why Choose Library Manager? 🤔

- **User-Friendly**: Simple navigation with an elegant UI.
- **Feature-Rich**: Covers all aspects of library management.
- **Secure & Efficient**: Optimized for performance and scalability.
- **Well-Structured Code**: Following best practices with robust testing.

# Table of Contents
- Demo
- Technologies

# Demo
Here is a demonstration of how the app works:
- Desktop: https://youtu.be/fdQKORbRqUI

To run the application, follow these steps:

1. If you are using a SQL database, import the provided SQL schema. Locate the Database.sql file in the project root.

   Run the following command to import the database schema:

   For MySQL:

   ```bash
   mysql -u your_username -p your_database < Database.sql
   ```

2. Clone the repository:
    ```bash
    git clone https://github.com/Paveu/LibraryManager.git
    cd library-manager
    ```

3. Install dependencies for back-end:
    ```bash
    cd library-manager-back
    yarn install
    ```

4. Start the backend server:
    ```bash
    yarn start:dev
    ```

5. Install dependencies for front-end:
    ```bash
    cd library-manager-front
    yarn install
    ```

6. Start the frontend application:
    ```bash
    yarn dev
    ```

# Tech Stack
- **Backend:** Express.js
- **Frontend:** React with Material UI
- **Database:** MySQL
- **Authentication:** Role-based access control
- **Testing:** Jest & Cypress for unit and E2E tests
- **Tooling:** Husky, ESLint, Prettier
- **State Management:** React Context API / Zustand 

---
This app simplifies library management while ensuring security and efficiency. 🚀📖

