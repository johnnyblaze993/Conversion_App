# endpoints per table

    endpoints per table

    1. Units
    GET /units
    POST /units
    PUT /units/{id}
    DELETE /units/{id}

    2. Users
    GET /users
    POST /users
    PUT /users/{id}
    DELETE /users/{id}
    GET /users/username/{username}
    GET /users/email/{email}

    3. Search History
    GET /search-history
    POST /search-history
    GET /search-history/user/{userId}

    4. Conversion Lists
    GET /conversion-lists
    POST /conversion-lists
    PUT /conversion-lists/{id}/favorite
    GET /conversion-lists/user/{userId}

    5. Conversions
    GET /conversions
    POST /conversions
    GET /conversions/list/{listId}
    GET /conversions/user/{userId}

    6. User Preferences
    GET /user-preferences
    POST /user-preferences
    GET /user-preferences/user/{userId}

    7. List Comments
    GET /list-comments
    POST /list-comments
    GET /list-comments/list/{listId}
    GET /list-comments/user/{userId}
    8. User Activity Logs
    GET /user-activity-log
    POST /user-activity-log
    GET /user-activity-log/user/{userId}
