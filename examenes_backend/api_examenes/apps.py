from django.apps import AppConfig

class ApiExamenesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api_examenes'

    def ready(self):
        import api_examenes.signals  # Asegúrate de importar las señales