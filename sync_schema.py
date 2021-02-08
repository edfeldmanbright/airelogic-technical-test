import os

os.system(
    "python manage.py graphql_schema --schema "
    "schema.schema --out react_app/schema.graphql"
)
