from datetime import timedelta
from django.core.management.base import BaseCommand
from api_examenes.models import Doctor, Paciente, Examen

class Command(BaseCommand):
    help = "Carga doctores, pacientes y examen de ejemplo"

    def handle(self, *args, **kwargs):
        if not Doctor.objects.exists():
            Doctor.objects.create(
                cedula='12345678',
                nombre='Carlos Gómez',
                tarjeta_profesional='TP-001122',
                especialidad='Radiología'
            )
            Doctor.objects.create(
                cedula='87654321',
                nombre='Laura Pérez',
                tarjeta_profesional='TP-003344',
                especialidad='Medicina Deportiva'
            )
            self.stdout.write(self.style.SUCCESS('✅ Doctores cargados.'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ Doctores ya existen.'))

        if not Paciente.objects.exists():
            Paciente.objects.create(
                cedula='11223344',
                nombre='Juan Martínez',
                profesion='Ingeniero',
                peso=72.5,
                altura=1.75
            )
            Paciente.objects.create(
                cedula='55667788',
                nombre='Ana Rodríguez',
                profesion='Profesora',
                peso=65.2,
                altura=1.62
            )
            self.stdout.write(self.style.SUCCESS('✅ Pacientes cargados.'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ Pacientes ya existen.'))

        if not Examen.objects.filter(codigo='US-MR-001').exists():
            Examen.objects.create(
                codigo='US-MR-001',
                nombre='Ultrasonido de Manguito Rotador',
                tiempo_estimado=timedelta(minutes=30)  # en lugar de '00:30:00'
            )
            self.stdout.write(self.style.SUCCESS('✅ Examen cargado.'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ Examen ya existe.'))

        self.stdout.write(self.style.SUCCESS('🎉 ¡Datos de ejemplo cargados exitosamente!'))
