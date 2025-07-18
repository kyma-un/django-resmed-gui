from django.db import models

class Doctor(models.Model):
    cedula = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    tarjeta_profesional = models.CharField(max_length=50, unique=True)
    especialidad = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} ({self.especialidad})"

class Paciente(models.Model):
    cedula = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    profesion = models.CharField(max_length=100)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    altura = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return self.nombre

class Examen(models.Model):
    codigo = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    tiempo_estimado = models.DurationField(help_text="Formato: HH:MM:SS")

    def __str__(self):
        return self.nombre

class Acompanante(models.Model):
    nombre = models.CharField(max_length=100)
    numero_contacto = models.CharField(max_length=20)
    parentesco = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre} ({self.parentesco})"

class Cita(models.Model):
    especialidad = models.CharField(max_length=100)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE)
    acompanante = models.ForeignKey(Acompanante, on_delete=models.SET_NULL, null=True, blank=True)
    diagnostico = models.TextField(blank=True)
    fecha = models.DateField()
    hora = models.TimeField()

    def __str__(self):
        return f"Cita de {self.paciente.nombre} con {self.doctor.nombre} el {self.fecha}"

class ExamenRealizado(models.Model):
    cita = models.OneToOneField(Cita, on_delete=models.CASCADE)
    doctor_ejecutor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, related_name='examenes_realizados')
    fecha_realizacion = models.DateField()
    hora_realizacion = models.TimeField()
    resultado_examen = models.TextField()
    imagenes_diagnosticas = models.FileField(upload_to='diagnosticos/', null=True, blank=True)

    def __str__(self):
        return f"Resultado del examen {self.cita.examen.nombre} de {self.cita.paciente.nombre}"
