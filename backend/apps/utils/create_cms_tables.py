import os
import sys
import django  # pyrefly: ignore [missing-import]

# Setup Django context
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection  # pyrefly: ignore [missing-import]

queries = [
    'CREATE TABLE IF NOT EXISTS "cms_portfolioitem" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(150) NOT NULL, "description" text NOT NULL, "client" varchar(100) NULL, "completion_date" date NULL, "image" varchar(100) NULL, "image_url" varchar(255) NULL, "category" varchar(50) NOT NULL, "technologies" varchar(255) NOT NULL, "status" varchar(20) NOT NULL, "live_url" varchar(255) NULL, "github_url" varchar(255) NULL, "is_confidential" bool NOT NULL);',
    'CREATE TABLE IF NOT EXISTS "cms_service" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(100) NOT NULL, "description" text NOT NULL, "icon" varchar(50) NOT NULL, "price" decimal NOT NULL, "billing_cycle" varchar(20) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS "cms_testimonial" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "client_name" varchar(100) NOT NULL, "role" varchar(100) NOT NULL, "message" text NOT NULL, "rating" smallint unsigned NOT NULL CHECK ("rating" >= 0), "is_featured" bool NOT NULL, "created_at" datetime NOT NULL, "user_id" bigint NULL REFERENCES "accounts_customuser" ("id") DEFERRABLE INITIALLY DEFERRED);',
    'CREATE INDEX IF NOT EXISTS "cms_testimonial_user_id_8555cbcb" ON "cms_testimonial" ("user_id");'
]

with connection.cursor() as cursor:
    for sql in queries:
        try:
            cursor.execute(sql)
            print(f"Executed table creation SQL: {sql[:50]}...")
        except Exception as e:
            print(f"SQL execution error: {e}")
