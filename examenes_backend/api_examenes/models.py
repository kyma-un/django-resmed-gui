from django.contrib.auth.models import User
from django.db import models

def ruta_video_diagnostico(instance, filename):
    # Obtener cédula del paciente
    cedula = instance.cita.paciente.cedula
    # Obtener ID de la cita
    cita_id = instance.cita.id
    # Nombre fijo o personalizado del archivo
    nombre_archivo = 'video.mp4'
    # Retornar ruta relativa al directorio MEDIA
    return os.path.join('diagnostico', str(cedula), str(cita_id), nombre_archivo)

class PerfilUsuario(models.Model):
    ROLES = (
        ('paciente', 'Paciente'),
        ('doctor', 'Doctor'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rol = models.CharField(max_length=10, choices=ROLES)

    def __str__(self):
        return f"{self.user.username} - {self.get_rol_display()}"

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    cedula = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    tarjeta_profesional = models.CharField(max_length=50, unique=True)
    especialidad = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username

class Paciente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='paciente_profile')
    cedula = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    profesion = models.CharField(max_length=100, null=True, blank=True)
    peso = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    altura = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username

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
    id = models.AutoField(primary_key=True)
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
    cita = models.OneToOneField(Cita, on_delete=models.CASCADE, primary_key=True)
    doctor_ejecutor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, related_name='examenes_realizados')
    fecha_realizacion = models.DateField()
    hora_realizacion = models.TimeField()
    resultado_examen = models.TextField()
    video_diagnostico = models.FileField(upload_to=ruta_video_diagnostico, null=True, blank=True)

    def __str__(self):
        return f"Resultado del examen {self.cita.examen.nombre} de {self.cita.paciente.nombre}"