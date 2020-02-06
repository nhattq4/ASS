# ASS Authentication service

This service is used to handle authentication and authorization for ASS application.
This API is secured using Bearer Authentication.

## Convention

Key                             | Case of Convention    | Example
--------------------------------|-----------------------|---------------------------------
1. Api service endpoint access  | "/api"                | http://auth.localhost.com/api
2. Api service folder name      | snake-case            | ass-auth-service
3. Api service name             | snake-case            | /user/get-by-email
4. Folder & file name           | camelCase (s)         | models, services, middlewares, utils, functions.js, swaggerOptions.js
5. Database name                | snake_case            | ass-auth-service
6. Database table name          | snake_case (s)        | users, user-roles, user-parent-companies
7. Database column name         | camelCase             | employeeId, parentCompanyName
