import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PortfolioItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('client', models.CharField(blank=True, max_length=100, null=True)),
                ('completion_date', models.DateField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='portfolio/')),
                ('image_url', models.CharField(blank=True, max_length=255, null=True)),
                ('category', models.CharField(default='Web Development', max_length=50)),
                ('technologies', models.CharField(blank=True, default='', max_length=255)),
                ('status', models.CharField(default='completed', max_length=20)),
                ('live_url', models.CharField(blank=True, max_length=255, null=True)),
                ('github_url', models.CharField(blank=True, max_length=255, null=True)),
                ('is_confidential', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('icon', models.CharField(default='Layers', max_length=50)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('billing_cycle', models.CharField(choices=[('one_time', 'One Time'), ('monthly', 'Monthly'), ('annual', 'Annual')], default='one_time', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_name', models.CharField(max_length=100)),
                ('role', models.CharField(default='Client', max_length=100)),
                ('message', models.TextField()),
                ('rating', models.PositiveSmallIntegerField(default=5)),
                ('is_featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='testimonials', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
