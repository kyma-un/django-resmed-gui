from django.dispatch import receiver
from django.db.models.signals import post_save
from social_django.models import UserSocialAuth

from api_examenes.models import Paciente, PerfilUsuario

@receiver(post_save, sender=UserSocialAuth)
def crear_perfil_usuario_oauth(sender, instance, created, **kwargs):
    if created and instance.provider == 'google-oauth2':
        user = instance.user

        # Verificar si ya tiene un perfil (previene duplicados)
        perfil, perfil_created = PerfilUsuario.objects.get_or_create(
            user=user,
            defaults={'rol': 'paciente'}
        )

        # Crear paciente solo si es un perfil recién creado
        if perfil_created:
            Paciente.objects.create(perfil=perfil)
            print(f"[SIGNAL] Perfil de paciente creado para {user.email}")
