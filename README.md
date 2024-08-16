# How to run:

    ./deploy.sh

# issues with sh scripts:

    Convert Line Endings for wait-for-it.sh
    Open Git Bash or WSL on your system where you have the wait-for-it.sh script.

    Navigate to the Directory containing wait-for-it.sh.
        dos2unix ./wait-for-it.sh

    Navigate to the Directory containing deploy.sh
        dos2unix deploy.sh

# remove old volumes when you make changes to sql.init

    docker-compose down -v
    docker volume rm conversion_app_postgres-data

# Mapped entities

        when using the @MappedEntity annotation, make sure to use this:
        - @MappedEntity("table_name")
