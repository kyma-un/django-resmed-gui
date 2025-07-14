from django.core.management.base import BaseCommand
from api_examenes.models import Doctor, Paciente, Examen, Cita, ExamenRealizado, Acompanante
from datetime import date, time, datetime, timedelta
import random

class Command(BaseCommand):
    help = "Crea citas y resultados de ejemplo con relaciones entre entidades."

    def handle(self, *args, **kwargs):
        doctores = list(Doctor.objects.all())
        pacientes = list(Paciente.objects.all())
        examenes = list(Examen.objects.all())

        if not doctores or not pacientes or not examenes:
            self.stdout.write(self.style.ERROR("⚠️ No hay suficientes datos cargados para generar citas."))
            return

        especialidades = ['Radiología', 'Medicina Deportiva', 'Ortopedia']

        for i in range(5):
            doctor = random.choice(doctores)
            paciente = random.choice(pacientes)
            examen = random.choice(examenes)

            # Acompañante opcional
            if random.random() > 0.5:
                acompanante = Acompanante.objects.create(
                    nombre=f"Acompañante {i}",
                    numero_contacto=f"30012345{i}",
                    parentesco=random.choice(['Padre', 'Madre', 'Esposo/a', 'Hermano/a'])
                )
            else:
                acompanante = None

            fecha_cita = date.today() + timedelta(days=i)
            hora_cita = time(hour=8 + i, minute=0)

            cita = Cita.objects.create(
                especialidad=random.choice(especialidades),
                doctor=doctor,
                paciente=paciente,
                examen=examen,
                diagnostico="Diagnóstico preliminar de hombro",
                acompanante=acompanante,
                fecha=fecha_cita,
                hora=hora_cita
            )

            # Examen realizado relacionado a la cita
            ExamenRealizado.objects.create(
                cita=cita,
                doctor_ejecutor=doctor,  # En este ejemplo el mismo doctor ejecuta el examen
                fecha_realizacion=fecha_cita,
                hora_realizacion=hora_cita,
                resultado_examen="No se observaron lesiones evidentes. Movimiento limitado leve.",
                imagenes_diagnosticas=None  # Puedes conectar un archivo real luego
            )

        self.stdout.write(self.style.SUCCESS("✅ Citas y resultados creados exitosamente."))
