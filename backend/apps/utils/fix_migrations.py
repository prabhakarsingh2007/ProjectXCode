import os
import sys
import django

# Setup Django context
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection

with connection.cursor() as cursor:
    try:
        # Check if already exists first
        cursor.execute("SELECT id FROM django_migrations WHERE app = 'cms' AND name = '0001_initial';")
        row = cursor.fetchone()
        if not row:
            cursor.execute("INSERT INTO django_migrations (app, name, applied) VALUES ('cms', '0001_initial', datetime('now'));")
            print("Successfully recorded cms.0001_initial in database migration history.")
        else:
            print("cms.0001_initial already recorded in history.")
    except Exception as e:
        print(f"SQL execution error: {e}")
