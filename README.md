# How to run:

    ./deploy.sh

# issues with sh scripts:

    Convert Line Endings for wait-for-it.sh
    Open Git Bash or WSL on your system where you have the wait-for-it.sh script.

    Navigate to the Directory containing wait-for-it.sh:
    dos2unix ./wait-for-it.sh

    Navigate to the Directory containing deploy.sh:
    dos2unix deploy.sh

# remove old volumes when you make changes to sql.init

    docker-compose down -v
    docker volume rm conversion_app_postgres-data

# Mapped entities

    when using the @MappedEntity annotation, make sure to use this:
    @MappedEntity("table_name")

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
