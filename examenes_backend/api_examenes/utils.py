import random
from .models import Paciente

def generar_cedula_unica():
    while True:
        cedula_random = str(random.randint(1000000000, 9999999999))
        if not Paciente.objects.filter(cedula=cedula_random).exists():
            return cedula_random